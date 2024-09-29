import React, { useEffect, useRef, useState, useLayoutEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { Drawer, List, ListItem, ListSubheader, ListItemIcon, ListItemText, Box } from '@mui/material';
import routes from '../../../routes';
import { getListItemStyle } from '../../../assets/theme/Drawer';
import { useUserId } from '../../../contexts/UserInfoContext';

import DrawerHeaderImageWhite from "../../../assets/img/Slack Post Manager White.png";
import DrawerHeaderImageBlack from "../../../assets/img/Slack Post Manager Black.png";

interface DrawerMenuProps {
    open: boolean;
    onClose: () => void;
    variant?: 'permanent' | 'persistent' | 'temporary';
    elevation?: number;
}

interface RouteType {
    type: string;
    name: string;
    key: string;
    path: string;
    icon: JSX.Element;
    element: JSX.Element;
    noCollapse: boolean;
    protected: boolean;
}

interface GroupedRoutesType {
    [key: string]: RouteType[];
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
    open,
    onClose,
    variant = 'temporary',
    elevation = 1,
}) => {
    const [selectedItemPosition, setSelectedItemPosition] = useState({ top: 0, height: 0 });
    const selectedRef = useRef<HTMLLIElement>(null);
    const user = useUserId();
    const getCurrentTheme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const handleNavigate = useCallback(
        (path: string) => {
            navigate(path);
            onClose();
        },
        [navigate, onClose]
    );

    useEffect(() => {
        if (location.pathname === '/') {
            handleNavigate('/main');
            updatePosition();
        }
    }, [location.pathname, handleNavigate]);

    const isRouteActive = (pathname: string, routePath: string) => {
        if (routePath === '/main') {
            return pathname === '/' || pathname === '/main';
        }
        return pathname === routePath;
    };

    const groupedRoutes = useMemo(
        () => ({
            [t('Post')]: [routes[0]],
            [t('Settings')]: [routes[1]],
        }),
        [t]
    );

    const getFilteredRoutes = useCallback(
        (groupedRoutes: GroupedRoutesType): GroupedRoutesType => {
            const filteredRoutes: GroupedRoutesType = {};
            Object.keys(groupedRoutes).forEach((group) => {
                const filteredGroupRoutes = groupedRoutes[group].filter(
                    (route: RouteType) => user || !route.protected
                );
                if (filteredGroupRoutes.length > 0) {
                    filteredRoutes[group] = filteredGroupRoutes;
                }
            });
            return filteredRoutes;
        },
        [user]
    );

    const filteredGroupedRoutes = useMemo(() => {
        return getFilteredRoutes(groupedRoutes);
    }, [groupedRoutes, getFilteredRoutes]);

    const updatePosition = useCallback(() => {
        Object.entries(filteredGroupedRoutes).forEach(([_, groupRoutes]) => {
            groupRoutes.forEach((route) => {
                if (isRouteActive(location.pathname, route.path)) {
                    const listItem = document.getElementById(route.key);
                    if (listItem) {
                        const rect = listItem.getBoundingClientRect();
                        setSelectedItemPosition({ top: rect.top, height: rect.height });
                    }
                }
            });
        });
    }, [filteredGroupedRoutes, location.pathname]);

    useLayoutEffect(() => {
        updatePosition();
    }, [location.pathname, updatePosition]);

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            variant={variant}
            elevation={elevation}
            sx={{ width: 250 }}
        >
            <List sx={{ width: 250, position: 'relative' }}>
                <Box
                    sx={{
                        width: 250,
                        height: 120,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <img  
                        src={getCurrentTheme.palette.mode === 'dark' ? DrawerHeaderImageWhite : DrawerHeaderImageBlack}  
                        alt="Logo"  
                        style={{ maxWidth: '90%' }}  
                    />
                </Box>
                {Object.entries(filteredGroupedRoutes).map(([group, groupRoutes]) => (
                    group !== t('Settings') && (
                        <React.Fragment key={group}>
                            {groupRoutes.length > 0 && (
                                <List
                                    sx={{ width: 250 }}
                                    subheader={
                                        <ListSubheader component="div" id={`group-${group}`}>
                                            {group}
                                        </ListSubheader>
                                    }
                                >
                                    {groupRoutes.map((route) => (
                                        <ListItem
                                            id={route.key}
                                            key={route.key}
                                            sx={{
                                                ...getListItemStyle(getCurrentTheme, location.pathname, route.path),
                                                cursor: 'pointer',
                                                backgroundColor: isRouteActive(location.pathname, route.path)
                                                    ? getCurrentTheme.palette.action.selected
                                                    : 'transparent',
                                            }}
                                            onClick={() => handleNavigate(route.path)}
                                            ref={isRouteActive(location.pathname, route.path) ? selectedRef : null}
                                        >
                                            <ListItemIcon>{route.icon}</ListItemIcon>
                                            <ListItemText primary={t(route.name)} />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </React.Fragment>
                    )
                ))}
            </List>
            <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <List>
                    {filteredGroupedRoutes[t('Settings')] && (
                        <React.Fragment key={t('Settings')}>
                            <List
                                sx={{ width: 250 }}
                                subheader={
                                    <ListSubheader component="div" id={`group-${t('Settings')}`}>
                                        {t('Settings')}
                                    </ListSubheader>
                                }
                            >
                                {filteredGroupedRoutes[t('Settings')].map((route) => (
                                    <ListItem
                                        id={route.key}
                                        key={route.key}
                                        sx={{
                                            ...getListItemStyle(getCurrentTheme, location.pathname, route.path),
                                            cursor: 'pointer',
                                            backgroundColor: isRouteActive(location.pathname, route.path)
                                                ? getCurrentTheme.palette.action.selected
                                                : 'transparent',
                                        }}
                                        onClick={() => handleNavigate(route.path)}
                                        ref={isRouteActive(location.pathname, route.path) ? selectedRef : null}
                                    >
                                        <ListItemIcon>{route.icon}</ListItemIcon>
                                        <ListItemText primary={t(route.name)} />
                                    </ListItem>
                                ))}
                            </List>
                        </React.Fragment>
                    )}
                </List>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: selectedItemPosition.top + 'px',
                    width: '5px',
                    height: selectedItemPosition.height + 'px',
                    bgcolor: 'transparent',
                    transition: 'top 0.3s ease, height 0.3s ease',
                    background: `linear-gradient(180deg, #21c2fe, #2077fe)`,
                }}
            />
        </Drawer>
    );
};  
