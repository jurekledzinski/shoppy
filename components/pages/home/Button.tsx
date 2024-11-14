
'use client'
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';

export const  ButtonClick  = () => {
    const theme = useTheme();

    return <Button sx={{color: theme.palette.text.primary ,background: theme.palette.background.brandCard}}>Click me</Button>
}