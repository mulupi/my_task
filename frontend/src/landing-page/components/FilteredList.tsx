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
import { gql, useQuery } from '@apollo/client';
import { Book } from '../../types/common';
import Paginate from '../../common/Paginate';
import { Watch } from 'react-loader-spinner';
import { FilteredListProps } from '../../types/common';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../redux/store';
import { modifySearch } from '../../redux/Actions';

const FILTER_BOOKS = gql`
  query FilterBooks($title: String!) {
    book(title: $title) {
        title,
        author,
        readingLevel,
        coverPhotoURL
  }
}`

const limit: number = 9

export default function FilteredList({ setReadingList, removeFromList, bookOnList }: FilteredListProps) {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state: RootState) => state.books.searchTerm)
    const { loading, data } = useQuery(FILTER_BOOKS, {
        variables: { title: searchTerm },
    });
    const [page, setPage] = React.useState<number>(1);
    const [books, setBooks] = React.useState<Book[]>([]);
    const bookList = useSelector((state: RootState) => state.books.books)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event.preventDefault();
        setPage(value);
    };

    React.useEffect(() => {
        data && setBooks(Paginate(data.book, page, limit))
    }, [data, page]);

    if (loading) return (
        <Watch
            visible={true}
            height="80"
            width="80"
            radius="48"
            color="#4fa94d"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );

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
                <Typography component="h2" variant="h4" sx={{ color: 'text.primary' }}>
                    Ello
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Search Results
                </Typography>
            </Box>
            {data.book.length > 0 ?
                (
                    <>
                        <Grid container spacing={2}>
                            {data && books.map((book: Book, index: number) => (
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
                                            {bookOnList(books[index]) ?
                                                (
                                                    <Button
                                                        size="small"
                                                        sx={{ color: 'ello2.contrastText' }}
                                                        onClick={(e) => { e.preventDefault(); removeFromList(books[index]) }}
                                                    >
                                                        Remove from reading list
                                                    </Button>
                                                ) :
                                                (
                                                    <Button
                                                        size="small"
                                                        sx={{ color: 'ello2.light' }}
                                                        onClick={(e) => { e.preventDefault(); setReadingList([...bookList, books[index]]) }}
                                                    >
                                                        Add to reading list
                                                    </Button>)
                                            }

                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Stack spacing={2}>
                            <Typography>Page: {page}</Typography>
                            <Pagination count={Math.ceil(data.book.length / limit)} page={page} onChange={handleChange} />
                        </Stack>
                    </>
                ) : (
                    <Box
                        sx={{
                            width: { sm: '100%', md: '60%' },
                            textAlign: { sm: 'left', md: 'center' },
                        }}
                    >
                        <Typography component="h2" variant="h4" sx={{ color: 'text.primary' }}>
                            Ooops!!
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            No books with title that match your filter
                        </Typography>
                        <Button
                            size="small"
                            sx={{ color: 'ello2.contrastText' }}
                            onClick={(e) => { e.preventDefault(); dispatch(modifySearch("")) }}
                        >
                            Go back
                        </Button>
                    </Box>
                )
            }
        </Container>
    );
}
