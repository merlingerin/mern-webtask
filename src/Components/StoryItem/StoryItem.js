import React from 'react';
import './StoryItem.css';
import jsonp from 'jsonp';

export default class StoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: null,
        }
    }

    componentWillReceiveProps() {
       const searchUrl = 'https://ru.wikipedia.org/w/api.php?action=opensearch&search='+this.props.story.content+'&limit=1&namespace=0&format=json';

        jsonp(searchUrl, (err, res) => {
            if(err) {
                throw err
            }

            this.setState({link: res[3]});
        })

    }

    render() {
        const {
            story,
            handleEdit,
            handleDelete
        } = this.props;


        return (
            <div className="StoryItem clearfix">
                <div className="col-sm-9 StoryItem__content">
                    <h4>{story.author}</h4>
                    <p><a href={this.state.link}>{story.content}</a></p>
                </div>   
                <div className="col-sm-3 StoryItem__control">
                    <span className="glyphicon glyphicon-edit"
                        onClick={handleDelete.bind(this, story._id)}
                    ></span>
                </div>
            </div>
        );
    }

}