import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Book } from '../../types/common';
import Paginate from '../../common/Paginate';
import { ReadingListProps } from '../../types/common';
import { useSelector } from "react-redux";
import { RootState } from '../../redux/store';

const limit: number = 9

export default function ReadingList({ removeFromList, setShowReadList }: ReadingListProps) {
    const [page, setPage] = React.useState<number>(1);
    const [books, setBooks] = React.useState<Book[]>([]);
    const bookList = useSelector((state: RootState) => state.books.books)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event.preventDefault();
        setPage(value);
    };

    React.useEffect(() => {
        setBooks(Paginate(bookList, page, limit))
    }, [page, bookList])
    return (
        <Container
            id="books"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
            }}
        >
            <Box
                sx={{
                    width: { sm: '100%', md: '60%' },
                    textAlign: { sm: 'left', md: 'center' },
                }}
            >
                <Typography component="h2" variant="h4" sx={{ color: 'ello.main' }}>
                    Ello
                </Typography>
                <Typography variant="body1" sx={{ color: 'ello2.light' }}>
                    View the reading list
                </Typography>
            </Box>
            {
                books.length > 0 ? (
                    <>
                        <Grid container spacing={2}>
                            {books.map((book: Book, index: number) => (
                                <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                                    <Card
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            flexGrow: 1,
                                            p: 1,
                                        }}
                                    >
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={book.coverPhotoURL}
                                                alt="image"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div" color="ello.light">
                                                    {book.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    by {book.author}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Reading level {book.readingLevel}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                sx={{ color: 'ello2.contrastText' }}
                                                onClick={(e) => { e.preventDefault(); removeFromList(books[index]) }}
                                            >
                                                Remove from reading list
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Stack spacing={2}>
                            <Typography>Page: {page}</Typography>
                            <Pagination count={books.length > 0 ? Math.ceil(bookList.length / limit) : 1} page={page} onChange={handleChange} />
                        </Stack>
                    </>
                ) : (
                    <Box
                        sx={{
                            width: { sm: '100%', md: '60%' },
                            textAlign: { sm: 'left', md: 'center' },
                        }}
                    >
                        <Typography component="h2" variant="h4" sx={{ color: 'ello.main' }}>
                            Ooops!!
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'ello2.light' }}>
                            No books on the reading list
                        </Typography>
                        <Button
                            size="small"
                            sx={{ color: 'ello2.contrastText' }}
                            onClick={(e) => { e.preventDefault(); setShowReadList(false) }}
                        >
                            Go back
                        </Button>
                    </Box>
                )
            }

        </Container>
    );
}
