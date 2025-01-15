import {
  CartButton,
  Header as MainHeader,
  MenuButton,
  ThemeButton,
} from '@/components/shared';

const Header = () => {
  return (
    <MainHeader>
      <ThemeButton />
      <CartButton />
      <MenuButton />
    </MainHeader>
  );
};

export default Header;
