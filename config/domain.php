<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Universal Domain Configuration
    |--------------------------------------------------------------------------
    |
    | Defines the dynamic terms and features for the single-tenant deployment.
    | All values can be overridden per-client via environment variables.
    |
    | Current client: Essar Techins (Industrial Machinery Manufacturer)
    |
    */

    'business_type'   => env('DOMAIN_BUSINESS_TYPE', 'Products'),

    // Category Terminology
    'category_label'  => env('DOMAIN_CATEGORY_LABEL', 'Product Category'),
    'category_plural' => env('DOMAIN_CATEGORY_PLURAL', 'Product Categories'),

    // Service / Product Terminology
    'service_label'   => env('DOMAIN_SERVICE_LABEL', 'Product'),
    'service_plural'  => env('DOMAIN_SERVICE_PLURAL', 'Products'),

    // Team / Personnel Terminology
    'team_label'      => env('DOMAIN_TEAM_LABEL', 'Team Member'),
    'team_plural'     => env('DOMAIN_TEAM_PLURAL', 'Our Team'),
    'has_team'        => env('DOMAIN_HAS_TEAM', false),

    // Navigation & Icon Configurations
    'category_icon'   => env('DOMAIN_CATEGORY_ICON', 'heroicon-o-squares-2x2'),
    'service_icon'    => env('DOMAIN_SERVICE_ICON', 'heroicon-o-cube'),
    'team_icon'       => env('DOMAIN_TEAM_ICON', 'heroicon-o-user-group'),
    'profile_icon'    => env('DOMAIN_PROFILE_ICON', 'heroicon-o-building-office-2'),
];
