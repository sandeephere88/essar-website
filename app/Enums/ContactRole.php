<?php

namespace App\Enums;

enum ContactRole: string
{
    case HEALTH_CARE_ORG = 'health_care_organization';
    case PROFESSIONAL_LOOKING_FOR_WORK = 'professional_looking_for_work';
    case OTHERS = 'others';
    case STAFFING_AGENCY = 'staffing_agency';

    public function label(): string
    {
        return match ($this) {
            self::HEALTH_CARE_ORG => 'Health / Care Organization',
            self::PROFESSIONAL_LOOKING_FOR_WORK => 'Professional looking for work',
            self::OTHERS => 'Others',
            self::STAFFING_AGENCY => 'Others',
        };
    }

    public static function options(): array
    {
        return [
            self::HEALTH_CARE_ORG->value => self::HEALTH_CARE_ORG->label(),
            self::PROFESSIONAL_LOOKING_FOR_WORK->value => self::PROFESSIONAL_LOOKING_FOR_WORK->label(),
            self::OTHERS->value => self::OTHERS->label(),
        ];
    }
}
