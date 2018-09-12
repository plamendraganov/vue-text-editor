<template>
  <div id="app">
    <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
              <label for="text">Text Editor</label><br>
              <div class="dropdownHolder">
              <select v-model="textColor">
                <option value="" disabled selected hidden>Color</option>
                <option value="black" style="backgroundColor: black">Black</option>
                <option value="red" style="backgroundColor: red">Red</option>
                <option value="blue" style="backgroundColor: blue">Blue</option>
                <option value="green" style="backgroundColor: green">Green</option>
                <option value="yellow" style="backgroundColor: yellow">Yellow</option>
                <option value="purple" style="backgroundColor: purple">Purple</option>
              </select>
        
              <select v-model="textBackgroundColor">
              <option value="" disabled selected hidden>Background-Color</option>
                <option value="black" style="backgroundColor: black">Black</option>
                <option value="red" style="backgroundColor: red">Red</option>
                <option value="blue" style="backgroundColor: blue">Blue</option>
                <option value="green" style="backgroundColor: green">Green</option>
                <option value="yellow" style="backgroundColor: yellow">Yellow</option>
                <option value="purple" style="backgroundColor: purple">Purple</option>
              </select>

              <select v-model="textSize">
                <option value="" disabled selected hidden>Font-Size</option>
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
                <option value="18">18</option>
                <option value="20">20</option>
                <option value="22">22</option>
              </select>
              </div>

              <textarea
                id="text"
                rows="5"
                class="form-control"
                placeholder="Type your text here"
                v-model.lazy="textToShow"
                :style="{color: textColor, 
                backgroundColor: textBackgroundColor,
                fontSize: textSize + 'px'}"></textarea>
          </div>
        </div>

        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <button class="btn btn-info" @click="add">Save</button>
                <button class="btn btn-danger" @click="undo">Undo</button>
                <button class="btn btn-success" @click="redo">Redo</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
      function LinkedList() {
          this.head = null;
          this.tail = null;
      }

      function Node(value, next, prev) {
          this.value = value;
          this.next = next;
          this.prev = prev;
      }

      LinkedList.prototype.addToHead = function(value) {
          const newNode = new Node(value, this.head, null);

          if(this.head){ 
              this.head.prev = newNode;
          }else{
              this.tail = newNode; 
          }

          this.head = newNode;
      };

      LinkedList.prototype.removeHead = function() {
          if(!this.head){
              return null;
          }

          let value = this.head.value;
          this.head = this.head.next;

          if(this.head){
              this.head.prev = null;
          }else{
              this.tail = null;
          }

          return value;
      }

      let list = new LinkedList();
      let redoPointer;
      let pointerBox = [];
      let counter = -1;

      export default {
        data: function() {
          return {
              result: '',
              textToShow: '',
              textColor: '',
              textBackgroundColor: '',
              textSize: '',
              obj: {},
              stack: [],
              updateCurrentState: function(updatedState){
                    this.textToShow = updatedState.text;
                    this.textColor = updatedState.color;
                    this.textBackgroundColor = updatedState.background;
                    this.textSize = updatedState.size;
              }
          }
        },
        methods: {
            add() {
                if(this.textToShow !== ""){

                    this.obj = {
                        color: this.textColor,
                        background: this.textBackgroundColor,
                        size: this.textSize,
                        text: this.textToShow
                    };  
                    list.addToHead(this.obj);  

                    this.updateCurrentState(list.head.value);
                           
                    pointerBox = [];
                    counter = -1;   
                    this.textToShow = "";
                    this.textColor = "";
                    this.textBackgroundColor = "";
                    this.textSize = "";
                }

            },

            undo() {
                redoPointer = list.removeHead();
                pointerBox.push(redoPointer);
                counter++;

                this.updateCurrentState(list.head.value);

                if(list.head.value.size === ""){
                    this.textSize = "14";
                }
            },

            redo() {
                if(counter >= 0){
                    list.addToHead(pointerBox[counter])
                    
                    this.updateCurrentState(list.head.value);
                    
                    counter--;
                }
            }
        }
      }

</script>

<style>
  .container {
    width: 80%;
    margin: 0 auto;
    margin-top: 100px;
  }
  .row {
    text-align: center;
  }

  .shownText {
    white-space: pre;
  }

  .dropdownHolder {
    text-align: left;
  }
  
  option {
   color: white;
  }
</style>
