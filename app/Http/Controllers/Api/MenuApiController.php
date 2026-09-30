<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Services\MenuService;
use Illuminate\Http\Request;

class MenuApiController extends Controller
{
    protected $menuService;

    public function __construct(MenuService $menuService)
    {
        $this->menuService = $menuService;
    }

    public function getBuilderData(Menu $menu)
    {
        $items = $menu->items()->orderBy('sort_order')->get();
        return response()->json([
            'menu' => $menu,
            'items' => $this->buildFlatTree($items)
        ]);
    }

    private function buildFlatTree($items, $parentId = null) {
        $tree = [];
        foreach ($items as $item) {
            if ($item->parent_id == $parentId) {
                $node = $item->toArray();
                $node['children'] = $this->buildFlatTree($items, $item->id);
                $tree[] = $node;
            }
        }
        return $tree;
    }

    public function saveBuilderData(Request $request, Menu $menu)
    {
        $request->validate([
            'items' => 'required|array',
            'deleted_ids' => 'array',
        ]);

        $this->menuService->updateMenuTree($menu, $request->items, $request->deleted_ids ?? []);

        return response()->json(['message' => 'Menu updated successfully']);
    }
    
    public function getPublicMenu($location)
    {
        return response()->json(
            $this->menuService->getMenuTreeByLocation($location)
        );
    }
}
