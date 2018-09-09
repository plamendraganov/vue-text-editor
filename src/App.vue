<template>
  <div id="app">
    <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
              <label for="text">Text Editor</label><br>
              <div class="dropdownHolder">
              <select v-model="textColor">
                <option value="" disabled selected hidden>Color</option>
                <option value="black" :style="{backgroundColor:"coral"}>Black</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="purple">Purple</option>
              </select>
        
              <select v-model="textBackgroundColor">
              <option value="" disabled selected hidden>Background-Color</option>
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="purple">Purple</option>
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

        <p>{{ stackTextSize }}</p>

        <hr>

        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
              <div v-if="stackText.length">
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
      stackText: [],
      textToShow: '',
      savedText: true,
      textColor: '',
      stackColor: [],
      colorToUse: '',
      textBackgroundColor: '',
      stackBackgroundColor: [],
      backgroundColorToUse: '',
      textSize: '',
      stackTextSize: [],
      sizeToUse: ''
    }
  },
  methods: {
    addText(){
      if(this.text !== ''){
        this.stackText.push(this.text);
        this.text = '';
        this.textToShow = this.stackText[this.stackText.length - 1];
        this.stackColor.push(this.textColor);
        this.textColor = '';
        this.colorToUse = this.stackColor[this.stackColor.length - 1];
        this.stackBackgroundColor.push(this.textBackgroundColor);
        this.textBackgroundColor = '';
        this.backgroundColorToUse = this.stackBackgroundColor[this.stackBackgroundColor.length - 1];
        this.stackTextSize.push(this.textSize);
        this.textSize = '';
        this.sizeToUse = this.stackTextSize[this.stackTextSize.length - 1] + 'px';
        this.savedText = true;
      }
    },
    undoText(stackText){
      this.stackText.pop();
      this.textToShow = this.stackText[this.stackText.length - 1];
      this.stackColor.pop();
      this.colorToUse = this.stackColor[this.stackColor.length - 1];
      this.stackBackgroundColor.pop();
      this.backgroundColorToUse = this.stackBackgroundColor[this.stackBackgroundColor.length - 1];
      this.stackTextSize.pop();
      this.sizeToUse = this.stackTextSize[this.stackTextSize.length - 1]  + 'px';
      this.savedText = false;
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
</style>
