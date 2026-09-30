<?php

namespace Tests\Feature;

use App\Models\Menu;
use App\Models\MenuItem;
use App\Models\MenuLocation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MenuTest extends TestCase
{
    use RefreshDatabase;

    public function test_menu_can_be_created()
    {
        $menu = Menu::create([
            'name' => 'Main Menu',
            'slug' => 'main-menu',
        ]);

        $this->assertDatabaseHas('menus', [
            'slug' => 'main-menu',
        ]);
    }

    public function test_menu_item_can_be_added_to_menu()
    {
        $menu = Menu::create([
            'name' => 'Main Menu',
            'slug' => 'main-menu',
        ]);

        $item = MenuItem::create([
            'menu_id' => $menu->id,
            'title' => 'Home',
            'item_type' => 'custom_url',
            'url' => '/',
        ]);

        $this->assertDatabaseHas('menu_items', [
            'title' => 'Home',
            'menu_id' => $menu->id,
        ]);
    }

    public function test_menu_can_be_assigned_to_location()
    {
        $menu = Menu::create([
            'name' => 'Main Menu',
            'slug' => 'main-menu',
        ]);

        $location = MenuLocation::create([
            'name' => 'Header',
            'slug' => 'header',
        ]);

        $menu->locations()->attach($location->id);

        $this->assertDatabaseHas('menu_location_assignments', [
            'menu_id' => $menu->id,
            'menu_location_id' => $location->id,
        ]);
    }
}
