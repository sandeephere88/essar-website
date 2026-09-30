<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Page;

class MigratePageBlocks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pages:migrate-blocks';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate existing page content to blocks format';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $pages = Page::whereNotNull('content')->get();

        foreach ($pages as $page) {
            $blocks = $page->blocks ?? [];
            
            // Check if we already migrated or have a rich_text block
            $hasRichText = collect($blocks)->contains('type', 'rich_text');
            
            if (!$hasRichText && !empty($page->content)) {
                $blocks[] = [
                    'type' => 'rich_text',
                    'data' => [
                        'content' => $page->content,
                    ],
                ];
                
                $page->blocks = $blocks;
                $page->save();
                
                $this->info("Migrated content for page: {$page->slug}");
            }
        }

        $this->info('Page blocks migration completed.');
    }
}
