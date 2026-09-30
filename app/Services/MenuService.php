<?php

namespace App\Services;

use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Support\Facades\Cache;

class MenuService
{
    public function duplicateMenu(Menu $originalMenu, Menu $newMenu)
    {
        $items = $originalMenu->items()->whereNull('parent_id')->orderBy('sort_order')->get();
        $this->duplicateItems($items, $newMenu->id, null);
    }

    private function duplicateItems($items, $menuId, $parentId = null)
    {
        foreach ($items as $item) {
            $newItem = $item->replicate();
            $newItem->menu_id = $menuId;
            $newItem->parent_id = $parentId;
            $newItem->save();

            if ($item->children->count() > 0) {
                $this->duplicateItems($item->children, $menuId, $newItem->id);
            }
        }
    }

    public function getMenuTreeByLocation(string $locationSlug)
    {
        return Cache::rememberForever('menu_location_' . $locationSlug, function () use ($locationSlug) {
            $menu = Menu::whereHas('locations', function ($query) use ($locationSlug) {
                $query->where('slug', $locationSlug);
            })->where('status', true)->first();

            if (!$menu) {
                if ($locationSlug === 'header') {
                    $menu = Menu::where('slug', 'header')->orWhere('slug', 'main-menu')->where('status', true)->first()
                        ?? Menu::where('status', true)->first();
                } elseif ($locationSlug === 'footer') {
                    $menu = Menu::where('slug', 'footer')->orWhere('slug', 'footer-menu')->where('status', true)->first();
                }
            }

            if (!$menu) {
                return [];
            }

            return $this->buildTree($menu->items()->whereNull('parent_id')->with('allChildren')->orderBy('sort_order')->get());
        });
    }
    
    public function getMenuTree(Menu $menu)
    {
        return $this->buildTree($menu->items()->whereNull('parent_id')->with('allChildren')->orderBy('sort_order')->get());
    }

    private function buildTree($items)
    {
        $tree = [];
        foreach ($items as $item) {
            $tree[] = [
                'id' => $item->id,
                'title' => $item->title,
                'navigation_label' => $item->navigation_label,
                'item_type' => $item->item_type,
                'url' => $this->resolveUrl($item),
                'target' => $item->target,
                'icon' => $item->icon,
                'css_classes' => $item->css_classes,
                'mega_menu_enabled' => $item->mega_menu_enabled,
                'children' => $this->buildTree($item->children),
            ];
        }
        return $tree;
    }

    private function resolveUrl($item)
    {
        if ($item->item_type === 'custom_url') {
            return $item->url;
        }
        if ($item->item_type === 'policy_pdf') {
            return $item->url; // stored as /policies/{id}/view
        }
        if ($item->item_type === 'cms_page' && $item->page) {
            return url($item->page->slug ?? '');
        }
        if ($item->item_type === 'route' && $item->route) {
            try {
                return route($item->route);
            } catch (\Exception $e) {
                return '#';
            }
        }
        return '#';
    }

    public function updateMenuTree(Menu $menu, array $items, array $deletedIds = [])
    {
        if (!empty($deletedIds)) {
            MenuItem::whereIn('id', $deletedIds)->delete();
        }
        
        $idMapping = [];
        $order = 0;
        $savedItems = [];
        
        // Pass 1: Create/update items to secure real database IDs
        foreach ($items as $itemData) {
            $order++;
            $isTemp = isset($itemData['id']) && str_starts_with((string)$itemData['id'], 'temp_');
            $searchId = $isTemp ? null : ($itemData['id'] ?? null);

            $item = MenuItem::updateOrCreate(
                ['id' => $searchId],
                [
                    'menu_id' => $menu->id,
                    'title' => $itemData['title'] ?? 'New Item',
                    'navigation_label' => $itemData['navigation_label'] ?? null,
                    'item_type' => $itemData['item_type'] ?? 'custom_url',
                    'url' => $itemData['url'] ?? null,
                    'route' => $itemData['route'] ?? null,
                    'page_id' => $itemData['page_id'] ?? null,
                    'category_id' => $itemData['category_id'] ?? null,
                    'sort_order' => $order,
                    'target' => $itemData['target'] ?? '_self',
                    'css_classes' => $itemData['css_classes'] ?? null,
                    'icon' => $itemData['icon'] ?? null,
                    'visibility' => $itemData['visibility'] ?? 'everyone',
                    'status' => $itemData['status'] ?? true,
                    'mega_menu_enabled' => $itemData['mega_menu_enabled'] ?? false,
                    // Temporarily set parent_id to null to prevent foreign key errors on new parents
                    'parent_id' => null, 
                ]
            );
            
            $idMapping[$itemData['id']] = $item->id;
            $savedItems[] = [
                'model' => $item,
                'original_parent_id' => $itemData['parent_id'] ?? null,
            ];
        }
        
        // Pass 2: Update parent IDs using the generated mapping
        foreach ($savedItems as $data) {
            $item = $data['model'];
            $originalParentId = $data['original_parent_id'];
            
            $finalParentId = null;
            if ($originalParentId) {
                // If it's a temp ID or a real ID, look it up in the mapping
                $finalParentId = $idMapping[$originalParentId] ?? $originalParentId;
            }
            
            $item->update(['parent_id' => $finalParentId]);
        }
        
        $this->clearCache($menu);
    }

    public function clearCache(?Menu $menu = null)
    {
        Cache::forget('menu_location_header');
        Cache::forget('menu_location_footer');
        Cache::forget('menu_location_footer_services');
        if ($menu) {
            foreach ($menu->locations as $location) {
                Cache::forget('menu_location_' . $location->slug);
            }
        }
    }
}
