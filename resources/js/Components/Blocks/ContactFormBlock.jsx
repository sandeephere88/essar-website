import React from 'react';
import ContactForm from '@/Components/ContactForm';

export default function ContactFormBlock({ data }) {
    const hasHeading = data?.heading_before || data?.heading_accent || data?.heading;
    const titleBefore = data?.heading_before || data?.heading || (hasHeading ? "" : "Talk to our");
    const titleAccent = data?.heading_accent || data?.accent || (hasHeading ? "" : "team");

    return (
        <ContactForm 
            titleBefore={titleBefore} 
            titleAccent={titleAccent}
            description={data?.description}
        />
    );
}
