import './styles/main.scss'
import { Button } from '@components/Button'
import { useAppSelector } from '@hooks'
import { useGetUpcomingMoviesQuery } from '@services/moviedb'

const App = () => {
  const currentPage = useAppSelector((state) => state.counter.value)

  const {
    data,
    error,
    isSuccess,
    isFetching,
  } = useGetUpcomingMoviesQuery(currentPage)

  return (
    <>
      <Button disabled={isSuccess && !data.has_more_pages || isFetching} >
        page is
      </Button>

      {isFetching ? 'loading...' : ''}

      {isSuccess ? data?.results?.map(upcomingMovie => (
        <div key={upcomingMovie.id}>
          {upcomingMovie.title}
        </div>
      )) : null}
    </>
  )
}

export default App
