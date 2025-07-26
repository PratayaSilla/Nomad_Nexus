type NavbarOption = {
    name: string;
    sendTo: string;
  };
  
  export const NavbarOptions: NavbarOption[] = [
    { name: 'Explore', sendTo: '/trip' },
    { name: 'Stories', sendTo: '/story' },
    { name: 'Create', sendTo: '' },
    { name: 'About', sendTo: '/about' },
  ];
  