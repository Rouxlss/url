import { Link, Text, useTheme } from '@nextui-org/react';
import React, { FC } from 'react'
import NextLink from 'next/link'

export const Navbar: FC = () => {
    
    const { theme, isDark } = useTheme();

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '20px 20px',
            backgroundColor: theme?.colors.gray900.value
        }}>
            <NextLink href='/' passHref >
                <Link>
                    <Text>
                        Create URL
                    </Text>
                </Link>
            </NextLink>
        </div>
    )
}
