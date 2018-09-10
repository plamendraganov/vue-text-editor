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
                value="this is text"
                :style="{color: textColor, 
                backgroundColor: textBackgroundColor,
                fontSize: textSize + 'px'}">{{ value }}</textarea>
          </div>
        </div>

        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <button class="btn btn-info" @click="add">Save</button>
                <button class="btn btn-danger" @click="undo">Undo</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      textToShow: '',
      textColor: '',
      textBackgroundColor: '',
      textSize: '',
      obj: {},
      stack: []
    }
  },
  methods: {
    add(){
      this.obj = {
        color: this.textColor,
        background: this.textBackgroundColor,
        size: this.textSize,
        text: this.textToShow
      };

      this.stack.push(this.obj);
        this.textToShow = this.stack[this.stack.length - 1].text;
        this.textColor = this.stack[this.stack.length - 1].color;
        this.textBackgroundColor = this.stack[this.stack.length - 1].background;
        this.textSize = this.stack[this.stack.length - 1].size;
      },

    undo(){
     if(this.stack.length === 1){
        this.textToShow = '';
        this.textColor = '';
        this.textBackgroundColor = '';
        this.textSize = '';
      }else{
        this.stack.pop();
        this.textToShow = this.stack[this.stack.length - 1].text;
        this.textColor = this.stack[this.stack.length - 1].color;
        this.textBackgroundColor = this.stack[this.stack.length - 1].background;
        this.textSize = this.stack[this.stack.length - 1].size;
        
        if(this.stack[this.stack.length - 1].size === ""){
          this.textSize = "14";
        }
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
