
tree-component <-> store <-> other component

## init tree
fetch data -> store update -> render tree

## tree data trigger
function -> store -> execute fn each tree node

```
    const fn = (self)=>{
        if (self.id === 3) {
            self.isOpen = true
        }
    }
    this.$store.commit('common/sendFn', {fn})

    then...

    each Tree node execute function
```