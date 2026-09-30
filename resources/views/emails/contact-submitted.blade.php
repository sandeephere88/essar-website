<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Submission</title>
</head>
<body style="font-family: sans-serif; line-height: 1.5; color: #333; padding: 20px; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
        <h2 style="color: #7C9082; border-bottom: 2px solid #E2D8C4; padding-bottom: 10px;">New Contact Message Received</h2>
        <p>A new message has been submitted via the contact form on your website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
                <td style="padding: 8px 0;">{{ $submission->name }}</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:{{ $submission->email }}">{{ $submission->email }}</a></td>
            </tr>
            <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0;">{{ $submission->phone ?? 'Not provided' }}</td>
            </tr>
            @if($submission->role)
            <tr>
                <td style="padding: 8px 0; font-weight: bold;">I'm a:</td>
                <td style="padding: 8px 0;">{{ $submission->role_label }}</td>
            </tr>
            @endif
            <tr>
                <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
                <td style="padding: 8px 0;">{{ $submission->subject ?? 'General Inquiry' }}</td>
            </tr>
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 4px; border-left: 4px solid #7C9082;">
            <strong style="display: block; margin-bottom: 8px;">Message:</strong>
            <p style="margin: 0; white-space: pre-wrap;">{{ $submission->message }}</p>
        </div>
        
        <p style="margin-top: 25px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 15px;">
            This email was sent automatically from the system. You can respond directly to the sender using their email address.
        </p>
    </div>
</body>
</html>
