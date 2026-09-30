<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ── Permissions ────────────────────────────────────────────────
        $permissions = [
            // Content
            'view content',
            'create content',
            'edit content',
            'delete content',
            'publish content',

            // Media
            'view media',
            'upload media',
            'delete media',

            // Users
            'view users',
            'manage users',

            // Roles
            'manage roles',

            // Settings
            'manage settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // ── Roles ──────────────────────────────────────────────────────
        $superAdmin = Role::firstOrCreate(['name' => 'Super Admin']);
        $superAdmin->syncPermissions(Permission::all()); // all permissions

        $contentManager = Role::firstOrCreate(['name' => 'Content Manager']);
        $contentManager->syncPermissions([
            'view content', 'create content', 'edit content', 'delete content', 'publish content',
            'view media', 'upload media', 'delete media',
        ]);

        $editor = Role::firstOrCreate(['name' => 'Editor']);
        $editor->syncPermissions([
            'view content', 'create content', 'edit content',
            'view media', 'upload media',
        ]);

        $this->command->info('✅ Roles and permissions seeded: Super Admin, Content Manager, Editor');
    }
}
