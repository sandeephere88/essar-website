import React from 'react';
import { storageUrl } from '@/Utils/asset';
import HeroBannerBlock from './HeroBannerBlock';
import RichTextBlock from './RichTextBlock';
import ImageTextBlock from './ImageTextBlock';
import CtaBannerBlock from './CtaBannerBlock';
import VideoEmbedBlock from './VideoEmbedBlock';
import DepartmentGridBlock from './DepartmentGridBlock';
import DoctorGridBlock from './DoctorGridBlock';
import TestimonialSliderBlock from './TestimonialSliderBlock';
import AccreditationStripBlock from './AccreditationStripBlock';
import GalleryBlockComponent from './GalleryBlockComponent';
import FaqAccordionBlock from './FaqAccordionBlock';
import StatsCountersBlock from './StatsCountersBlock';
import ContactFormBlock from './ContactFormBlock';
import ProfileBlock from './ProfileBlock';
import SpacerBlock from './SpacerBlock';
import TabsContentBlock from './TabsContentBlock';
import CustomHtmlBlock from './CustomHtmlBlock';
import UniqueExperiencesBlock from './UniqueExperiencesBlock';
import CareRoleGridBlock from './CareRoleGridBlock';
import OfficeLocationsBlock from './OfficeLocationsBlock';
import GoogleMapBlock from './GoogleMapBlock';
import ClientLogosBlock from './ClientLogosBlock';

const blockMap = {
    hero_banner: HeroBannerBlock,
    rich_text: RichTextBlock,
    image_text: ImageTextBlock,
    cta_banner: CtaBannerBlock,
    video_embed: VideoEmbedBlock,
    department_grid: DepartmentGridBlock,
    care_role_grid: CareRoleGridBlock,
    doctor_grid: DoctorGridBlock,
    testimonial_slider: TestimonialSliderBlock,
    accreditation_strip: AccreditationStripBlock,
    gallery_block: GalleryBlockComponent,
    faq_accordion: FaqAccordionBlock,
    stats_counters: StatsCountersBlock,
    contact_form: ContactFormBlock,
    profile_block: ProfileBlock,
    spacer: SpacerBlock,
    unique_experiences: UniqueExperiencesBlock,
    tabs_content: TabsContentBlock,
    custom_html: CustomHtmlBlock,
    office_locations: OfficeLocationsBlock,
    google_map: GoogleMapBlock,
    client_logos: ClientLogosBlock,
};

export default function BlockRenderer({ blocks }) {
    if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
        return (
            <div className="flex items-center justify-center py-32 text-brand-accent/50 text-xl font-serif">
                Content coming soon
            </div>
        );
    }

    // Group consecutive profile_block items together so multiple profile blocks render side-by-side in a team grid
    const processedBlocks = [];
    let currentProfileGroup = null;

    blocks.forEach((block) => {
        if (block.type === 'profile_block') {
            if (!currentProfileGroup) {
                currentProfileGroup = {
                    type: 'profile_block',
                    data: {
                        heading_before: block.data?.heading_before || "Meet Our",
                        heading_accent: block.data?.heading_accent || "Team",
                        heading_description: block.data?.heading_description || block.data?.description_text || (typeof block.data?.description === 'string' ? block.data.description : undefined),
                        bg_type: block.data?.bg_type,
                        bg_color: block.data?.bg_color,
                        bg_gradient: block.data?.bg_gradient,
                        bg_image: block.data?.bg_image,
                        groupedProfiles: []
                    }
                };
                processedBlocks.push(currentProfileGroup);
            }

            // Extract profile items from block data
            if (block.data?.profiles && Array.isArray(block.data.profiles) && block.data.profiles.length > 0) {
                currentProfileGroup.data.groupedProfiles.push(...block.data.profiles);
            } else if (block.data?.name || block.data?.image || block.data?.designation) {
                currentProfileGroup.data.groupedProfiles.push({
                    name: block.data.name,
                    designation: block.data.designation,
                    image: block.data.image,
                    image_url: block.data.image_url,
                    description: block.data.description,
                    link_url: block.data.link_url,
                    link_text: block.data.link_text,
                });
            }
        } else {
            currentProfileGroup = null;
            processedBlocks.push(block);
        }
    });

    return (
        <>
            {processedBlocks.map((block, index) => {
                const Component = blockMap[block.type];
                if (!Component) {
                    console.warn(`Unknown block type: ${block.type}`);
                    return null;
                }

                const { bg_type, bg_color, bg_gradient, bg_image } = block.data || {};
                let bgStyle = undefined;
                if (bg_type === 'color' && bg_color) {
                    bgStyle = { backgroundColor: bg_color };
                } else if (bg_type === 'gradient' && bg_gradient) {
                    bgStyle = { backgroundImage: bg_gradient };
                } else if (bg_type === 'image' && bg_image) {
                    bgStyle = {
                        backgroundImage: `url(${storageUrl(bg_image)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    };
                }

                return <Component key={index} data={block.data} bgStyle={bgStyle} />;
            })}
        </>
    );
}
