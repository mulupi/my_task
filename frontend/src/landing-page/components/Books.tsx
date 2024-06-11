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
import { BooksProps } from '../../types/common';
import ReadingList from './ReadingList';
import { useDispatch, useSelector } from "react-redux";
import { modifyList } from '../../redux/Actions';
import { RootState } from '../../redux/store';
import FilteredList from './FilteredList'

const GET_BOOKS = gql`
  query GetBooks {
    books{
      title,
      author,
      coverPhotoURL,
      readingLevel
  }
}`

const limit: number = 9

export default function Books({ setListItems, showReadList, setShowReadList }: BooksProps) {
  const dispatch = useDispatch();
  const { loading, data } = useQuery(GET_BOOKS);
  const [page, setPage] = React.useState<number>(1);
  const [books, setBooks] = React.useState<Book[]>([]);
  const [readingList, setReadingList] = React.useState<Book[]>([]);
  const searchTerm = useSelector((state: RootState) => state.books.searchTerm)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  React.useEffect(() => {
    data && setBooks(Paginate(data.books, page, limit))
  }, [data, page]);

  React.useEffect(() => {
    setListItems(readingList.length)
    dispatch(modifyList(readingList))
  }, [readingList, dispatch, setListItems]);

  const bookOnList = (selectedBook: Book): boolean => {
    if (readingList.length > 0)
      for (let book: number = 0; book < readingList.length; book++) {
        if (readingList[book].title === selectedBook.title && readingList[book].author === selectedBook.author)
          return true
      }
    return false
  }

  const removeFromList = (selectedBook: Book): void => {
    let index = 0
    for (let book: number = 0; book < readingList.length; book++) {
      if (readingList[book].title === selectedBook.title && readingList[book].author === selectedBook.author) {
        //found book
        index = book
        break;
      }
    }
    const newReadingList = [...readingList.slice(0, index), ...readingList.slice(index + 1)];
    setReadingList(newReadingList);
  }

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

  if (showReadList)
    return (
      <ReadingList removeFromList={removeFromList} setShowReadList={setShowReadList} />
    )

  if (searchTerm.length > 0)
    return (
      <FilteredList setReadingList={setReadingList} removeFromList={removeFromList} bookOnList={bookOnList} />
    )

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
          View our book collection
        </Typography>
      </Box>
      {data?.books.length > 0 ? (

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
                          onClick={(e) => { e.preventDefault(); setReadingList([...readingList, books[index]]) }}
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
            <Pagination count={Math.ceil(data.books.length / limit)} page={page} onChange={handleChange} />
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
            No books in our library
          </Typography>
        </Box>
      )}
    </Container>
  );
}
