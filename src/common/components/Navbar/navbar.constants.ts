type NavbarOption = {
    name: string;
    sendTo: string;
  };
  
  export const NavbarOptions: NavbarOption[] = [
    { name: 'Explore', sendTo: '/trips' },
    { name: 'Stories', sendTo: '/story' },
    { name: 'Create', sendTo: '/trips/create' },
    { name: 'About', sendTo: '/about' },
  ];
  