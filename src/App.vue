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
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
              </select>
              </div>

              <textarea
                      id="text"
                      rows="5"
                      class="form-control"
                      placeholder="Type your text here"
                      v-model.lazy="text"></textarea>
          </div>
        </div>

        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <button class="btn btn-primary" @click="addText">Save</button>
                <button class="btn btn-danger" @click="undoText">Undo</button>
            </div>
        </div>

        <hr>

        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
              <div v-if="stackData.length">
                <h4 class="shownText" 
                v-if="savedText">Your saved text is:<br><br>
                <span :style="{color: colorToUse, 
                backgroundColor: backgroundColorToUse,
                fontSize: sizeToUse}">{{ textToShow }}</span></h4>

                <h4 class="shownText" 
                v-else>Your previously saved text is:<br><br>
                <span :style="{color: colorToUse,
                backgroundColor: backgroundColorToUse,
                fontSize: sizeToUse}">{{ textToShow }}</span></h4>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      text: '',
      textToShow: '',
      textColor: '',
      colorToUse: '',
      textBackgroundColor: '',
      backgroundColorToUse: '',
      textSize: '',
      sizeToUse: '',
      stackData: [],
      objData: {},
      savedText: true
    }
  },
  methods: {
    addText(){
      if(this.text !== ''){
        this.objData = {
          text: this.text,
          color: this.textColor,
          background: this.textBackgroundColor,
          size: this.textSize
        };
        
        this.stackData.push(this.objData);

        this.text = '';
        this.textColor = '';
        this.textBackgroundColor = '';
        this.textSize = '';

        this.textToShow = this.stackData[this.stackData.length - 1].text;
        this.colorToUse = this.stackData[this.stackData.length - 1].color;
        this.backgroundColorToUse = this.stackData[this.stackData.length - 1].background;
        this.sizeToUse = this.stackData[this.stackData.length - 1].size + 'px';
        this.savedText = true; 
      }
    },
    undoText(stackText){
      this.stackData.pop();
      this.textToShow = this.stackData[this.stackData.length - 1].text;
      this.colorToUse = this.stackData[this.stackData.length - 1].color;
      this.backgroundColorToUse = this.stackData[this.stackData.length - 1].background;
      this.sizeToUse = this.stackData[this.stackData.length - 1].size  + 'px';
      this.savedText = false;
     if(this.stackData[this.stackData.length - 1].size === ""){
       this.sizeToUse = "1em";
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
