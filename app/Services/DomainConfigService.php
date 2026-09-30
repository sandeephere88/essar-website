<?php

namespace App\Services;

class DomainConfigService
{
    public static function getBusinessType(): string
    {
        return config('domain.business_type', 'Products');
    }

    public static function getCategoryLabel(bool $plural = false): string
    {
        return $plural
            ? config('domain.category_plural', 'Product Categories')
            : config('domain.category_label', 'Product Category');
    }

    public static function getServiceLabel(bool $plural = false): string
    {
        return $plural
            ? config('domain.service_plural', 'Products')
            : config('domain.service_label', 'Product');
    }

    public static function getTeamLabel(bool $plural = false): string
    {
        return $plural
            ? config('domain.team_plural', 'Our Team')
            : config('domain.team_label', 'Team Member');
    }

    public static function hasTeam(): bool
    {
        return (bool) config('domain.has_team', false);
    }

    public static function toArray(): array
    {
        return [
            'businessType'   => static::getBusinessType(),
            'categoryLabel'  => static::getCategoryLabel(false),
            'categoryPlural' => static::getCategoryLabel(true),
            'serviceLabel'   => static::getServiceLabel(false),
            'servicePlural'  => static::getServiceLabel(true),
            'teamLabel'      => static::getTeamLabel(false),
            'teamPlural'     => static::getTeamLabel(true),
            'hasTeam'        => static::hasTeam(),
        ];
    }
}
