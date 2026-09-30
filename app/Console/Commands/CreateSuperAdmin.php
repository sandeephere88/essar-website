<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class CreateSuperAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:super-admin {--name=} {--email=} {--password=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new super admin user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->option('name') ?? $this->ask('Enter super admin name');
        $email = $this->option('email') ?? $this->ask('Enter super admin email');
        
        if (User::where('email', $email)->exists()) {
            $this->error('A user with this email already exists.');
            return self::FAILURE;
        }
        
        $password = $this->option('password') ?? $this->secret('Enter super admin password');

        // Ensure the 'Super Admin' role exists
        $role = Role::firstOrCreate(['name' => 'Super Admin', 'guard_name' => 'web']);

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        $user->assignRole($role);

        $this->info("Super Admin '{$name}' created successfully!");
        
        return self::SUCCESS;
    }
}
