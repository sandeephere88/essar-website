<?php

namespace App\Enums;

enum ContactRole: string
{
    case BUSINESS_INQUIRY = 'business_inquiry';
    case TECHNICAL_SUPPORT = 'technical_support';
    case OTHERS = 'others';
    case HEALTH_CARE_ORG = 'health_care_organization';
    case PROFESSIONAL_LOOKING_FOR_WORK = 'professional_looking_for_work';
    case STAFFING_AGENCY = 'staffing_agency';

    public function label(): string
    {
        return match ($this) {
            self::BUSINESS_INQUIRY, self::HEALTH_CARE_ORG => 'Product / Machine Quote',
            self::TECHNICAL_SUPPORT, self::PROFESSIONAL_LOOKING_FOR_WORK => 'Technical Support / Service',
            self::OTHERS, self::STAFFING_AGENCY => 'Others',
        };
    }

    public static function options(): array
    {
        return [
            self::BUSINESS_INQUIRY->value => self::BUSINESS_INQUIRY->label(),
            self::TECHNICAL_SUPPORT->value => self::TECHNICAL_SUPPORT->label(),
            self::OTHERS->value => self::OTHERS->label(),
        ];
    }
}
