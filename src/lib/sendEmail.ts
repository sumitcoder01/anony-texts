import { resend } from "@/lib/resend";
import Email from "./emails/Email";
import { APIResponse } from '@/types/ApiResponse';

export async function sendEmail(
    email: string,
    subject: string,
    username: string,
    verifyCode: string
): Promise<APIResponse> {
    try {
        await resend.emails.send({
            from: process.env.RESEND_DOMAIN!,
            to: email,
            subject,
            react: Email({ username, otp: verifyCode, subject }),
        });
        return { success: true, message: 'email sent successfully.' };
    } catch (emailError) {
        console.error('Error sending email:', emailError);
        return { success: false, message: 'Failed to send email.' };
    }
}