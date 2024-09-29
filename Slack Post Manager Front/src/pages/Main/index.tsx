import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Avatar, Grid2, Modal } from '@mui/material';

//DEMO用
import samplePost from '../../data/Sample/samplePosts.json';
const PostsList = samplePost;
//DEMO用

type Post = {
    id: number;
    name: string;
    content: string;
    ocrContent: string;
    imageUrl: string;
    date: string;
};

export const Main: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const handleOpen = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage('');
    };

    return (
        <Box sx={{ padding: 2, maxHeight: '80vh' }}>
            {PostsList.map((post: Post) => (
                <Card key={post.id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Grid2 container spacing={2}>
                            <Grid2 size={12} display="flex" justifyContent="space-between" alignItems="center">
                                <Box display="flex" alignItems="center">
                                    <Avatar />
                                    <Typography variant="h6" sx={{ marginLeft: 1 }}>
                                        {post.name}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="textSecondary">
                                    {post.date}
                                </Typography>
                            </Grid2>
                            <Grid2 size={12} display="flex" justifyContent="space-between" alignItems="flex-start">
                                <Box flex={1}>
                                    <Typography variant="body1" sx={{ marginTop: 1 }}>
                                        {post.content}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                                        {post.ocrContent}
                                    </Typography>
                                </Box>
                                <CardMedia
                                    component="img"
                                    image={post.imageUrl}
                                    alt="画像"
                                    sx={{ cursor: 'pointer', maxWidth: 100, objectFit: 'cover', marginLeft: 2 }}
                                    onClick={() => handleOpen(post.imageUrl)}
                                />
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </Card>
            ))}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 'auto',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        overflow: 'auto',
                    }}
                >
                    <img src={selectedImage} alt="拡大画像" style={{ width: '100%', height: 'auto' }} />
                </Box>
            </Modal>
        </Box>
    );
};  