import { Component, Prop, h, State, Event, EventEmitter } from '@stencil/core';
// import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * itemList
   */
  @State() itemList: Array<any>;
  /**
   * itemList
   */
  @Event() selectedItem: EventEmitter;

  selectItem(selectedItem) {
    //console.log(selectedItem)
    this.selectedItem.emit(selectedItem);
  }
  /**
   * The middle name
   */
  @Prop() noOfResults: number;

  componentWillLoad() {
    
  }

  fetchAndFilter(event) {
    const keyword = event.target.value.toUpperCase()
    if (keyword.trim().length > 0) {
      this.itemList = []
      fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()).then(json => {
        json.map(post => {
          if (post.title.toUpperCase().indexOf(keyword) > -1) {
            //exits
            this.itemList = [
              ...this.itemList,
              post
            ]
          } else {
            // doesnt
          }
        })
      })
    } else {
      this.itemList = []
    }
  }
  
  render() {

    return <div class="drop-down"> 
      <input type="text" placeholder="Enter keyword" onKeyUp={(event: UIEvent) => this.fetchAndFilter(event)}/>
      <div class={'result-wrapper ' + (this.itemList && this.itemList.length > 0 ? 'show': 'hide')}>
      {this.itemList && this.itemList.map(post =>
          <div class="item" onClick={() => this.selectItem(post)}> <p>{post.title}</p></div>
      )}
      </div>
    </div>;
  }
}
