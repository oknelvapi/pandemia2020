import React from 'react';

import { Menu, MenuItem } from '@material-ui/core';

type HeaderPopoverProps = {
  handleClose: () => void;
  handleMenuItemClick: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  selectedIndex: number;
  anchorEl: null | HTMLElement;
  items: Array<string>;
};

const HeaderPopover: React.FC<HeaderPopoverProps> = (props: HeaderPopoverProps) => {
  const { handleClose, handleMenuItemClick, selectedIndex, anchorEl, items } = props;
  const open = Boolean(anchorEl);

  return (
    <Menu id="country-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
      {items.map((item, index) => (
        <MenuItem
          key={item}
          // disabled={index !== 0}
          selected={index === selectedIndex}
          onClick={(event): void => handleMenuItemClick(event, index)}
        >
          {item}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default HeaderPopover;
