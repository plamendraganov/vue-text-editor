<template>
  <div id="app">
    <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
              <label for="text">Text Editor</label><br>
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
              <div v-if="textStatesQueue.length">
                <h4 class="shownText" 
                v-if="savedText">Your saved text is:<br><br>
                <span v-colorized>{{ textToShow }}</span></h4>

                <h4 class="shownText" 
                v-else>Your previously saved text is:<br><br>
                <span v-colorized:previous="'red'">{{ textToShow }}</span></h4>
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
      textStatesQueue: [],
      textToShow: '',
      savedText: true
    }
  },
  methods: {
    addText(){
      if(this.text !== ''){
        this.textStatesQueue.push(this.text);
        this.text = '';
        this.textToShow = this.textStatesQueue[this.textStatesQueue.length - 1];
        this.savedText = true;
      }
    },
    undoText(textStatesQueue){
      this.textStatesQueue.pop();
      this.textToShow = this.textStatesQueue[this.textStatesQueue.length - 1];
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
</style>
