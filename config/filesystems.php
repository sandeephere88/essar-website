<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    */

    'default' => env('FILESYSTEM_DISK', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    | Both 'public' (local) and 's3' disks are configured for medialibrary.
    | Set MEDIA_DISK=s3 in .env to switch media storage to S3.
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root'   => storage_path('app/private'),
            'serve'  => true,
            'throw'  => false,
            'report' => false,
        ],

        'public' => [
            'driver'     => 'local',
            'root'       => storage_path('app/public'),
            'url'        => '/storage',
            'visibility' => 'public',
            'throw'      => false,
            'report'     => false,
        ],

        /*
         |----------------------------------------------------------------------
         | S3 Disk — used for media storage in production
         | Set in .env:
         |   AWS_ACCESS_KEY_ID=
         |   AWS_SECRET_ACCESS_KEY=
         |   AWS_DEFAULT_REGION=
         |   AWS_BUCKET=
         |   MEDIA_DISK=s3
         |----------------------------------------------------------------------
         */
        's3' => [
            'driver'                  => 's3',
            'key'                     => env('AWS_ACCESS_KEY_ID'),
            'secret'                  => env('AWS_SECRET_ACCESS_KEY'),
            'region'                  => env('AWS_DEFAULT_REGION', 'us-east-1'),
            'bucket'                  => env('AWS_BUCKET'),
            'url'                     => env('AWS_URL'),
            'endpoint'                => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
            'visibility'              => 'public',
            'throw'                   => false,
            'report'                  => false,
        ],

        /*
         |----------------------------------------------------------------------
         | Media Library conversions disk (optional)
         | Keep conversions local even when originals are on S3.
         | Set MEDIA_CONVERSIONS_DISK=public in .env if desired.
         |----------------------------------------------------------------------
         */
        'media-conversions' => [
            'driver'     => 'local',
            'root'       => storage_path('app/public/conversions'),
            'url'        => '/storage/conversions',
            'visibility' => 'public',
            'throw'      => false,
            'report'     => false,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Symbolic Links
    |--------------------------------------------------------------------------
    */

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];
