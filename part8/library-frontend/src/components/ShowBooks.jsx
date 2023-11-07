
const ShowBooks = ({ books, genre }) => {

  const tableSpacing = {
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "30px",
    paddingRight: "40px"
  }

  return (
    <table>
        <tbody>
          <tr>
            <th style={tableSpacing}>title</th>
            <th style={tableSpacing}>author</th>
            <th style={tableSpacing}>published</th>
          </tr>
          {books.filter(x => genre === 'all' ? true : x.genres
                .includes(genre)).map((a) => (
                  <tr key={a.title}>
                    <td style={tableSpacing}>{a.title}</td>
                    <td style={tableSpacing}>{a.author.name}</td>
                    <td style={tableSpacing}>{a.published}</td>
                  </tr>
          ))}
        </tbody>
      </table>
  )
}

export default ShowBooks