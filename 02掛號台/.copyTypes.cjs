const fs = require('fs')
const path = require('path')

// Define paths to the source and destination files
const srcPath = path.join(__dirname, '/src/dts/fields.d.ts')
const destPath = path.join(__dirname, '/src/dts/types.d.ts')

// Function to replace 'kintone.fieldTypes' with 'KintoneRecordField'
function replaceSyntax(text) {
  return text.replace(/kintone\.fieldTypes/g, 'KintoneRecordField')
}

// Read the contents of the source file
fs.readFile(srcPath, 'utf8', function(err, data) {
  if (err) throw err

  // Extract fields from the source file
  const fieldsMatch = data.match(/interface Fields \{([^}]+)\}/)
  if (!fieldsMatch ||!fieldsMatch[1]) {
    console.error('No Fields interface found in fields.d.ts')
    return
  }

  const fieldsContent = fieldsMatch[1];
  const fieldsWithNewSyntax = replaceSyntax(fieldsContent)

  // Prepare the new content for types.d.ts
  let newContent = `import type { KintoneRecordField } from '@kintone/rest-api-client'

declare namespace KintoneTypes {
  type Base = {
    $id: KintoneRecordField.Id;
    $revision: KintoneRecordField.Revision;
    更新人: KintoneRecordField.Modifier;
    建立人: KintoneRecordField.Creator;
    記錄號碼: KintoneRecordField.RecordNumber;
    更新時間: KintoneRecordField.UpdatedTime;
    建立時間: KintoneRecordField.CreatedTime;
  }

  type Fields = Base & {${fieldsWithNewSyntax}}

  type Fc<T extends string> = {
    [key in T]: ${'`${key}`'}
  }

  namespace E {
    interface Fields {
      type: string,
      record?: KintoneTypes.Fields
      records?: (KintoneTypes.Fields)[]
    }
  }
}`

  // Write the new content to the destination file
  fs.writeFile(destPath, newContent, 'utf8', function(err) {
    if (err) throw err
    console.log("Fields copied and syntax changed successfully!")
  })
})
