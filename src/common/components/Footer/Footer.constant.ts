export interface FooterOption {
    name: string;
    sendTo: string;
}

export const FooterOptions: FooterOption[] = [
    { name: 'About Us', sendTo: '/about' },
    { name: 'Contact Us', sendTo: '' },
    { name: 'Privacy Policy', sendTo: '' },
    { name: 'Terms of Service', sendTo: '' }
];