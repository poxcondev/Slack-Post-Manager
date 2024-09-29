import React from 'react';
import { Container, Grid, Avatar, Typography, Paper } from '@mui/material';

export const PostList: React.FC = () => {
    return (
        <Container>
            <Paper style={{ padding: 16, marginBottom: 16 }}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar />
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6">氏名</Typography>
                        <Typography>投稿内容 XXXX</Typography>
                        <Typography>画像OCR結果内容 YYYY</Typography>
                        <Typography>YYYY/MM/dd</Typography>
                    </Grid>
                    <Grid item>
                        <img src="image_url" alt="画像" style={{ width: '100%' }} />
                    </Grid>
                </Grid>
            </Paper>
            {/* 他の投稿も同様に表示 */}
        </Container>
    );
};
