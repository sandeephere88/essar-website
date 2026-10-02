<?php

namespace App\Filament\Pages;

use App\Models\BusinessProfile;
use Filament\Actions\Action;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class BusinessSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';
    protected static ?string $navigationLabel = 'Business Settings';
    protected static ?string $navigationGroup = 'Settings';
    protected static ?int $navigationSort = 100;
    protected static string $view = 'filament.pages.business-settings';

    public ?array $data = [];

    public function mount(): void
    {
        $profile = BusinessProfile::current()->toArray();

        // Normalize social_links so dot-notation fields (social_links.facebook, etc.)
        // are always populated, even when the DB value is null or has missing keys.
        $profile['social_links'] = array_merge(
            ['facebook' => '', 'instagram' => '', 'twitter' => '', 'youtube' => '', 'linkedin' => ''],
            array_map(fn ($v) => $v ?? '', $profile['social_links'] ?? [])
        );

        $this->form->fill($profile);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Tabs::make('Business Settings')
                    ->tabs([

                        /* ── General Info ───────────────────────── */
                        Tabs\Tab::make('General')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                Grid::make(2)->schema([
                                    TextInput::make('name')
                                        ->label('Business Name')
                                        ->required()
                                        ->maxLength(255),
                                    TextInput::make('tagline')
                                        ->label('Tagline / Motto')
                                        ->maxLength(255),
                                ]),
                                FileUpload::make('logo')
                                    ->label('Logo')
                                    ->image()
                                    ->disk('public')
                                    ->directory('business/logo')
                                    ->maxSize(2048)
                                    ->columnSpanFull(),
                                Textarea::make('address')
                                    ->label('Full Address')
                                    ->rows(3)
                                    ->columnSpanFull(),
                                TextInput::make('email')
                                    ->label('General Email')
                                    ->email()
                                    ->maxLength(255),
                            ]),

                        /* ── Contact Numbers ────────────────────── */
                        Tabs\Tab::make('Contact Numbers')
                            ->icon('heroicon-o-phone')
                            ->schema([
                                Repeater::make('phone_numbers')
                                    ->label('Phone Numbers')
                                    ->schema([
                                        Grid::make(2)->schema([
                                            TextInput::make('label')
                                                ->label('Label')
                                                ->placeholder('e.g. Main Reception')
                                                ->required(),
                                            TextInput::make('number')
                                                ->label('Number')
                                                ->tel()
                                                ->required(),
                                        ]),
                                    ])
                                    ->addActionLabel('+ Add Phone Number')
                                    ->collapsible()
                                    ->defaultItems(0)
                                    ->columnSpanFull(),

                                Repeater::make('emergency_numbers')
                                    ->label('Emergency Numbers')
                                    ->schema([
                                        Grid::make(2)->schema([
                                            TextInput::make('label')
                                                ->label('Label')
                                                ->placeholder('e.g. Hotline')
                                                ->required(),
                                            TextInput::make('number')
                                                ->label('Number')
                                                ->tel()
                                                ->required(),
                                        ]),
                                    ])
                                    ->addActionLabel('+ Add Emergency Number')
                                    ->collapsible()
                                    ->defaultItems(0)
                                    ->columnSpanFull(),
                            ]),

                        /* ── Social Links ───────────────────────── */
                        Tabs\Tab::make('Social Links')
                            ->icon('heroicon-o-share')
                            ->schema([
                                Section::make()
                                    ->description('Paste full profile URLs (leave blank to hide)')
                                    ->schema([
                                        TextInput::make('social_links.facebook')
                                            ->label('Facebook')
                                            ->url()
                                            ->prefix('https://'),
                                        TextInput::make('social_links.instagram')
                                            ->label('Instagram')
                                            ->url()
                                            ->prefix('https://'),
                                        TextInput::make('social_links.twitter')
                                            ->label('Twitter / X')
                                            ->url()
                                            ->prefix('https://'),
                                        TextInput::make('social_links.youtube')
                                            ->label('YouTube')
                                            ->url()
                                            ->prefix('https://'),
                                        TextInput::make('social_links.linkedin')
                                            ->label('LinkedIn')
                                            ->url()
                                            ->prefix('https://'),
                                    ])
                                    ->columns(2),
                            ]),

                        /* ── Working Hours ──────────────────────── */
                        Tabs\Tab::make('Working Hours')
                            ->icon('heroicon-o-clock')
                            ->schema([
                                Section::make()
                                    ->description('Set open/close times per day. Leave blank for closed.')
                                    ->schema(
                                        collect([
                                            'monday', 'tuesday', 'wednesday',
                                            'thursday', 'friday', 'saturday', 'sunday',
                                        ])->map(fn ($day) =>
                                            Grid::make(3)->schema([
                                                Forms\Components\Placeholder::make("{$day}_label")
                                                    ->label('')
                                                    ->content(ucfirst($day)),
                                                TextInput::make("working_hours.{$day}.open")
                                                    ->label('Opens at')
                                                    ->placeholder('08:00 AM'),
                                                TextInput::make("working_hours.{$day}.close")
                                                    ->label('Closes at')
                                                    ->placeholder('06:00 PM'),
                                            ])
                                        )->toArray()
                                    ),
                            ]),

                        /* ── Map ────────────────────────────────── */
                        Tabs\Tab::make('Map')
                            ->icon('heroicon-o-map-pin')
                            ->schema([
                                Textarea::make('map_embed_url')
                                    ->label('Google Maps Embed URL / iframe src')
                                    ->rows(4)
                                    ->helperText('Paste the src URL from Google Maps → Share → Embed a map.')
                                    ->columnSpanFull(),
                            ]),

                        /* ── Search & Indexing ──────────────────── */
                        Tabs\Tab::make('Search & Indexing')
                            ->icon('heroicon-o-command-line')
                            ->schema([
                                Textarea::make('robots_txt')
                                    ->label('Robots.txt Directives')
                                    ->placeholder("User-agent: *\nDisallow: /admin\nAllow: /")
                                    ->rows(6)
                                    ->helperText('Customize the robots.txt directives served at /robots.txt. The sitemap URL will be appended automatically.')
                                    ->columnSpanFull(),
                            ]),

                        /* ── Header Buttons ─────────────────────── */
                        Tabs\Tab::make('Header Buttons')
                            ->icon('heroicon-o-cursor-arrow-rays')
                            ->schema([
                                Section::make('Primary Button (right-most)')
                                    ->description('Shown as the solid coloured button — e.g. "Register"')
                                    ->columns(2)
                                    ->schema([
                                        TextInput::make('custom_attributes.header_btn_primary_label')
                                            ->label('Button Label')
                                            ->placeholder('Register')
                                            ->maxLength(60),
                                        TextInput::make('custom_attributes.header_btn_primary_url')
                                            ->label('Button URL')
                                            ->placeholder('https://portal.example.com/register')
                                            ->maxLength(500),
                                    ]),

                                Section::make('Secondary Button')
                                    ->description('Shown as the outlined button — e.g. "Login"')
                                    ->columns(2)
                                    ->schema([
                                        TextInput::make('custom_attributes.header_btn_secondary_label')
                                            ->label('Button Label')
                                            ->placeholder('Login')
                                            ->maxLength(60),
                                        TextInput::make('custom_attributes.header_btn_secondary_url')
                                            ->label('Button URL')
                                            ->placeholder('https://portal.example.com/login')
                                            ->maxLength(500),
                                    ]),
                            ]),

                        /* ── YouTube Block ──────────────────────── */
                        Tabs\Tab::make('YouTube Block')
                            ->icon('heroicon-o-video-camera')
                            ->schema([
                                Section::make('Homepage YouTube Block Settings')
                                    ->description('Configure the YouTube channel / video iframe block displayed above the homepage footer.')
                                    ->schema([
                                        Toggle::make('custom_attributes.show_youtube_block')
                                            ->label('Show YouTube Block on Homepage')
                                            ->default(true)
                                            ->helperText('Enable or disable the YouTube channel section on the homepage.'),

                                        TextInput::make('custom_attributes.youtube_block_title')
                                            ->label('Block Title')
                                            ->placeholder('Watch Our Latest Videos & Machinery Demos')
                                            ->maxLength(255),

                                        TextInput::make('custom_attributes.youtube_block_subtitle')
                                            ->label('Block Subtitle')
                                            ->placeholder('Subscribe to our YouTube channel to see copra dryers, oil mills, and industrial machinery in action.')
                                            ->maxLength(500),

                                        Textarea::make('custom_attributes.youtube_embed_url')
                                            ->label('YouTube Embed URL / iframe src')
                                            ->rows(2)
                                            ->placeholder('https://www.youtube.com/embed/videoseries?list=YOUR_PLAYLIST_ID or https://www.youtube.com/embed/VIDEO_ID')
                                            ->helperText('Paste a YouTube embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID or channel embed URL). If left blank, it will use the YouTube link from Social Links or a default channel video.'),
                                    ]),
                            ]),

                    ])
                    ->columnSpanFull(),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        $profile = BusinessProfile::current();
        $profile->fill($data)->save();

        Notification::make()
            ->title('Business settings saved!')
            ->success()
            ->send();
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('save')
                ->label('Save Settings')
                ->action('save')
                ->color('primary'),
        ];
    }
}
