const simple = {
    props : [ 'formId', 'model', 'id', 'initValue', 'label', 'disabled', 'autofocus' ],
    data : function() { return {
        value : this.initValue,
        timeoutFn : undefined,
        error : undefined,
        help : undefined
    }},
    computed : {
        htmlId : function() {
            return (this.formId? this.formId+'-' : '') + this.model.id
        },
        hasMessage : function() {
            return this.error!=undefined || this.help!=undefined
        },
        hasHelp : function() {
            return this.help!=undefined
        },
        hasError : function() {
            return this.error!=undefined
        }
    },
    watch : {
        value : function() {
            clearTimeout(this.timeoutFn);
            const me = this
            // Trigger just one update 0.6 sec after last user input
            this.timeoutFn = setTimeout(function(){ 
                if (!this.disabled)
                    me.$emit('update', {
                        id : me.model.id,
                        value : me.value
                    })
            }, 600);
        }
    }
}

const checkbox = Object.assign({}, simple, {
    computed : Object.assign({}, simple.computed, {
        checkedFirst : function() {
            if (this.model.initValue===this.model.firstValue) return 'checked'
        },
        checkedSecond : function() {
            if (this.model.initValue===this.model.secondValue) return 'checked'
        },
        toggleLabel : function() {
            if (this.value)
                return this.model.activeLabel
            else 
                return this.model.inactiveLabel
        }
    })
})

export default {
    SIMPLE : simple,
    CHECKBOX : checkbox
}