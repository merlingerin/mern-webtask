import React, { Component } from 'react';
import Axios from 'axios';

import StoryList from './Components/StoryList/StoryList';
import StoryButton from './Components/StoryButton/StoryButton';
import StoryModal from './Components/StoryModal/StoryModal';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      stories: [],
      story: {
        author: '',
        content: '',
        type: props.type,
        _id: undefined
      },
      label: props.label
    };

    this.apiUrl = 'https://wt-1a5cbe228e9d36874154ddcd9acf5bb4-0.run.webtask.io/wt-mern-api/stories/'+props.type;
    this.rootUrl = 'https://wt-1a5cbe228e9d36874154ddcd9acf5bb4-0.run.webtask.io/wt-mern-api/stories/';
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    //Fetch stories from API and
    // update 'stories' state
    Axios.get(this.apiUrl).then(({data}) => {
      this.setState({stories: data});
    })
  }

closeModal(model) {
    this.setState({modalIsOpen: false});
    if(model) {
      this.setState({isLoading: true})
      if(!model._id) {
        Axios.post(this.rootUrl, model).then(({data}) => {
          this.setState({stories: [data, ...this.state.stories]});
          this.setState({isLoading: false})
        })
      } else {
        Axios.put(`${this.apiUrl}?id=${model._id}`, model).then(({data}) => {
          const storyToUpdate = this.state.stories.find(x => x._id === model._id);
          const updatedStory = Object.assign({}, storyToUpdate, data)
          const newStories = this.state.stories.map(story => {
            if(data._id === story._id) return updatedStory;
            return story;
          })
          this.setState({stories: newStories});
          this.setState({isLoading: false})
        })
      }
    }
    this.setState({story: {
      author: '',
      content: '',
      _id: undefined
    }})
  }

  openModal(story) {
    this.setState({
      modalIsOpen: true
    });

    if(story) {
      this.setState({story});
    }
  }

  handleEdit(id) {
    // Open a modal to update a story
     // Uncomment this line later
    this.openModal(this.state.stories.find(x => x._id === id))
  }

  handleDelete(id) {
    //Delete story from API
    Axios.delete(`${this.rootUrl}?id=${id}`).then(() => {
      //Remove story from stories list
      const updatedStories = this.state.stories.findIndex(x => x._id === id)
      this.setState({
        states: [...this.state.stories.splice(updatedStories, 1)]
      });
    })
  }

  render() {
    return (
      <div className="App">
        <div className="col-md-4 Story">
          <div className="StoryHeader">
            <h2>{this.state.label}</h2>
          </div>
          <StoryList 
            stories={this.state.stories}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
          />
          <div className="StoryFooter">
            <p>Thank You</p>
          </div>
          <StoryButton handleClick={this.openModal.bind(this, null)} />
        </div>
        
        <StoryModal
            modalIsOpen={this.state.modalIsOpen}
            story={this.state.story}
            closeModal={this.closeModal}
            type={this.state.story.type}
        />
      </div>
    );
  }
}

export default App;
