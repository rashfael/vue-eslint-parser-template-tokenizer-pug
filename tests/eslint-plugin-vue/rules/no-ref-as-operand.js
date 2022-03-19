// AUTOGENERATED FROM https://github.com/vuejs/eslint-plugin-vue/blob/8f094200664a2b10bc597016f5486066a174e098/tests/lib/rules/no-ref-as-operand.js @2022-03-19T13:08:36.685Z
/**
 * @author Yosuke Ota
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const path = require('path')
const rule = require('../../fixtures/eslint-plugin-vue/lib/rules/no-ref-as-operand')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {  ecmaVersion: 2020, sourceType: 'module' , templateTokenizer: { pug: path.resolve(__dirname, '../../../')}}
})

tester.run('no-ref-as-operand', rule, {
  valid: [
    `
    import { ref } from 'vue'
    const count = ref(0)
    console.log(count.value) // 0

    count.value++
    console.log(count.value) // 1
    `,
    `
    <script>
      import { ref } from 'vue'
      export default {
        setup() {
          const count = ref(0)
          console.log(count.value) // 0

          count.value++
          console.log(count.value) // 1
          return {
            count
          }
        }
      }
    </script>
    `,
    `
    <script>
      import { ref } from '@vue/composition-api'
      export default {
        setup() {
          const count = ref(0)
          console.log(count.value) // 0

          count.value++
          console.log(count.value) // 1
          return {
            count
          }
        }
      }
    </script>
    `,
    `
    import { ref } from 'vue'
    const count = ref(0)
    if (count.value) {}
    switch (count.value) {}
    var foo = -count.value
    var foo = +count.value
    count.value++
    count.value--
    count.value + 1
    1 - count.value
    count.value || other
    count.value && other
    var foo = count.value ? x : y
    `,
    `
    import { ref } from 'vue'
    const foo = ref(true)
    if (bar) foo
    `,
    `
    import { ref } from 'vue'
    const foo = ref(true)
    var a = other || foo // ignore
    var b = other && foo // ignore

    let bar = ref(true)
    var a = bar || other
    var b = bar || other
    `,
    `
    import { ref } from 'vue'
    let count = not_ref(0)

    count++
    `,
    `
    import { ref } from 'vue'
    const foo = ref(0)
    const bar = ref(0)
    var baz = x ? foo : bar
    `,
    `
    import { ref } from 'vue'
    // Probably wrong, but not checked by this rule.
    const {value} = ref(0)
    value++
    `,
    `
    import { ref } from 'vue'
    const count = ref(0)
    function foo() {
      let count = 0
      count++
    }
    `,
    `
    import { ref } from 'unknown'
    const count = ref(0)
    count++
    `,
    `
    import { ref } from 'vue'
    const count = ref
    count++
    `,
    `
    import { ref } from 'vue'
    const count = ref(0)
    foo = count
    `,
    `
    import { ref } from 'vue'
    const count = ref(0)
    const foo = count
    `,
    {
      code: `
      <script>
        import { ref, computed, toRef, customRef, shallowRef } from 'vue'
        const foo = shallowRef({})
        foo[bar] = 123
      </script>
      `
    },
    {
      code: `
      <script>
        import { ref, computed, toRef, customRef, shallowRef } from 'vue'
        const foo = shallowRef({})
        const isComp = foo.effect
      </script>
      `
    }
  ],
  invalid: [
    {
      code: `
      import { ref } from 'vue'
      let count = ref(0)

      count++ // error
      console.log(count + 1) // error
      console.log(1 + count) // error
      `,
      output: `
      import { ref } from 'vue'
      let count = ref(0)

      count.value++ // error
      console.log(count.value + 1) // error
      console.log(1 + count.value) // error
      `,
      errors: [
        {
          message:
            'Must use `.value` to read or write the value wrapped by `ref()`.',
          line: 5,
          column: 7,
          endLine: 5,
          endColumn: 12
        },
        {
          message:
            'Must use `.value` to read or write the value wrapped by `ref()`.',
          line: 6,
          column: 19,
          endLine: 6,
          endColumn: 24
        },
        {
          message:
            'Must use `.value` to read or write the value wrapped by `ref()`.',
          line: 7,
          column: 23,
          endLine: 7,
          endColumn: 28
        }
      ]
    },
    {
      code: `
      <script>
        import { ref } from 'vue'
        export default {
          setup() {
            let count = ref(0)

            count++ // error
            console.log(count + 1) // error
            console.log(1 + count) // error
            return {
              count
            }
          }
        }
      </script>
      `,
      output: `
      <script>
        import { ref } from 'vue'
        export default {
          setup() {
            let count = ref(0)

            count.value++ // error
            console.log(count.value + 1) // error
            console.log(1 + count.value) // error
            return {
              count
            }
          }
        }
      </script>
      `,
      errors: [
        {
          messageId: 'requireDotValue',
          line: 8,
          column: 13,
          endLine: 8,
          endColumn: 18
        },
        {
          messageId: 'requireDotValue',
          line: 9,
          column: 25,
          endLine: 9,
          endColumn: 30
        },
        {
          messageId: 'requireDotValue',
          line: 10,
          column: 29,
          endLine: 10,
          endColumn: 34
        }
      ]
    },
    {
      code: `
      <script>
        import { ref } from '@vue/composition-api'
        export default {
          setup() {
            let count = ref(0)

            count++ // error
            console.log(count + 1) // error
            console.log(1 + count) // error
            return {
              count
            }
          }
        }
      </script>
      `,
      output: `
      <script>
        import { ref } from '@vue/composition-api'
        export default {
          setup() {
            let count = ref(0)

            count.value++ // error
            console.log(count.value + 1) // error
            console.log(1 + count.value) // error
            return {
              count
            }
          }
        }
      </script>
      `,
      errors: [
        {
          messageId: 'requireDotValue',
          line: 8,
          column: 13,
          endLine: 8,
          endColumn: 18
        },
        {
          messageId: 'requireDotValue',
          line: 9,
          column: 25,
          endLine: 9,
          endColumn: 30
        },
        {
          messageId: 'requireDotValue',
          line: 10,
          column: 29,
          endLine: 10,
          endColumn: 34
        }
      ]
    },
    {
      code: `
      import { ref } from 'vue'
      const foo = ref(true)
      if (foo) {
        //
      }
      `,
      output: `
      import { ref } from 'vue'
      const foo = ref(true)
      if (foo.value) {
        //
      }
      `,
      errors: [
        {
          messageId: 'requireDotValue',
          line: 4
        }
      ]
    },
    {
      code: `
      import { ref } from 'vue'
      const foo = ref(true)
      switch (foo) {
        //
      }
      `,
      output: `
      import { ref } from 'vue'
      const foo = ref(true)
      switch (foo.value) {
        //
      }
      `,
      errors: [
        {
          messageId: 'requireDotValue',
          line: 4
        }
      ]
    },
    {
      code: `
      import { ref } from 'vue'
      const foo = ref(0)
      var a = -foo
      var b = +foo
      var c = !foo
      var d = ~foo
      `,
      output: `
      import { ref } from 'vue'
      const foo = ref(0)
      var a = -foo.value
      var b = +foo.value
      var c = !foo.value
      var d = ~foo.value
      `,
      errors: [
        {
          messageId: 'requireDotValue',
          line: 4
        },
        {
          messageId: 'requireDotValue',
          line: 5
        },
        {
          messageId: 'requireDotValue',
          line: 6
        },
        {
          messageId: 'requireDotValue',
          line: 7
        }
      ]
    },
    {
      code: `
      import { ref } from 'vue'
      let foo = ref(0)
      foo += 1
      foo -= 1
      baz += foo
      baz -= foo
      `,
      output: `
      import { ref } from 'vue'
      let foo = ref(0)
      foo.value += 1
      foo.value -= 1
      baz += foo.value
      baz -= foo.value
      `,
      errors: [
        {
          messageId: 'requireDotValue',
          line: 4
        },
        {
          messageId: 'requireDotValue',
          line: 5
        },
        {
          messageId: 'requireDotValue',
          line: 6
        },
        {
          messageId: 'requireDotValue',
          line: 7
        }
      ]
    },
    {
      code: `
      import { ref } from 'vue'
      const foo = ref(true)
      var a = foo || other
      var b = foo && other
      `,
      output: `
      import { ref } from 'vue'
      const foo = ref(true)
      var a = foo.value || other
      var b = foo.value && other
      `,
      errors: [
        {
          messageId: 'requireDotValue',
          line: 4
        },
        {
          messageId: 'requireDotValue',
          line: 5
        }
      ]
    },
    {
      code: `
      import { ref } from 'vue'
      let foo = ref(true)
      var a = foo ? x : y
      `,
      output: `
      import { ref } from 'vue'
      let foo = ref(true)
      var a = foo.value ? x : y
      `,
      errors: [
        {
          messageId: 'requireDotValue',
          line: 4
        }
      ]
    },
    {
      code: `
      <script>
        import { ref } from 'vue'
        let count = ref(0)
        export default {
          setup() {
            count++ // error
            console.log(count + 1) // error
            console.log(1 + count) // error
            return {
              count
            }
          }
        }
      </script>
      `,
      output: `
      <script>
        import { ref } from 'vue'
        let count = ref(0)
        export default {
          setup() {
            count.value++ // error
            console.log(count.value + 1) // error
            console.log(1 + count.value) // error
            return {
              count
            }
          }
        }
      </script>
      `,
      errors: [
        {
          messageId: 'requireDotValue',
          line: 7
        },
        {
          messageId: 'requireDotValue',
          line: 8
        },
        {
          messageId: 'requireDotValue',
          line: 9
        }
      ]
    },
    {
      code: `
      <script>
        import { ref, computed, toRef, customRef, shallowRef } from 'vue'
        let count = ref(0)
        let cntcnt = computed(()=>count.value+count.value)

        const state = reactive({
          foo: 1,
          bar: 2
        })

        const fooRef = toRef(state, 'foo')

        let value = 'hello'
        const cref = customRef((track, trigger) => {
          return {
            get() {
              track()
              return value
            },
            set(newValue) {
              clearTimeout(timeout)
              timeout = setTimeout(() => {
                value = newValue
                trigger()
              }, delay)
            }
          }
        })

        const foo = shallowRef({})

        count++ // error
        cntcnt++ // error

        const s = \`\${fooRef} : \${cref}\` // error x 2

        const n = foo + 1 // error
      </script>
      `,
      output: `
      <script>
        import { ref, computed, toRef, customRef, shallowRef } from 'vue'
        let count = ref(0)
        let cntcnt = computed(()=>count.value+count.value)

        const state = reactive({
          foo: 1,
          bar: 2
        })

        const fooRef = toRef(state, 'foo')

        let value = 'hello'
        const cref = customRef((track, trigger) => {
          return {
            get() {
              track()
              return value
            },
            set(newValue) {
              clearTimeout(timeout)
              timeout = setTimeout(() => {
                value = newValue
                trigger()
              }, delay)
            }
          }
        })

        const foo = shallowRef({})

        count.value++ // error
        cntcnt.value++ // error

        const s = \`\${fooRef.value} : \${cref.value}\` // error x 2

        const n = foo.value + 1 // error
      </script>
      `,
      errors: [
        {
          message:
            'Must use `.value` to read or write the value wrapped by `ref()`.',
          line: 33
        },
        {
          message:
            'Must use `.value` to read or write the value wrapped by `computed()`.',
          line: 34
        },
        {
          message:
            'Must use `.value` to read or write the value wrapped by `toRef()`.',
          line: 36
        },
        {
          message:
            'Must use `.value` to read or write the value wrapped by `customRef()`.',
          line: 36
        },
        {
          message:
            'Must use `.value` to read or write the value wrapped by `shallowRef()`.',
          line: 38
        }
      ]
    },
    {
      code: `
      <script>
        import { ref, computed, toRef, customRef, shallowRef } from 'vue'
        const foo = shallowRef({})
        foo.bar = 123
      </script>
      `,
      output: `
      <script>
        import { ref, computed, toRef, customRef, shallowRef } from 'vue'
        const foo = shallowRef({})
        foo.value.bar = 123
      </script>
      `,
      errors: [
        {
          messageId: 'requireDotValue'
        }
      ]
    },
    {
      code: `
      <script>
        import { ref } from 'vue'
        const foo = ref(123)
        const bar = foo?.bar
      </script>
      `,
      output: `
      <script>
        import { ref } from 'vue'
        const foo = ref(123)
        const bar = foo.value?.bar
      </script>
      `,
      errors: [
        {
          messageId: 'requireDotValue'
        }
      ]
    }
  ]
})
