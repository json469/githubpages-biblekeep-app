import * as React from 'react';
import Axios from 'axios'

import Notes from './components/Notes'

import './App.css';

class App extends React.Component {

  public state = {

    loaded: false,
    notes: []
  }

  public async componentDidMount() {

    const verses = ['heb 4:14-16', 'Phil 4:4-7', 'Psalm 31:7-10'];

    await verses.forEach( async verse => {

      const request = `https://api.esv.org/v3/passage/text/?q=${verse}&include-verse-numbers=false&include-footnotes=false&include-headings=false&include-short-copyright=false&include-passage-references=false&indent-poetry=false`;
      const config = {headers : {Authorization : '145dd9bb843cbbb7139f1bd00ee2d16cc151fe54'}}

      Axios.get(request, config)
        .then(res => {
          const note = res.data;
          const joined = this.state.notes.concat(note);   // Could not yet find a clean way to add object to a state array, so just joined them before and updated it to the new one
          this.setState({
            notes: joined,
            loaded : true
          })
        });
    });
  }

  public render() {
    return (
      <div>
        <Notes notes={this.state.notes} loaded={this.state.loaded} />
      </div>
    );
  }
}

export default App;
