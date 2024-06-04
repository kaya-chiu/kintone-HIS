const config = {
  events: {
    create: {
      show: [
        'app.record.create.show',
        'mobile.app.record.create.show',
      ],
      submit: [
        'app.record.create.submit',
        'mobile.app.record.create.submit',
      ],
      success: [
        'app.record.create.submit.success',
        'mobile.app.record.create.submit.success',
      ]
    },
    edit: {
      show: [
        'app.record.edit.show',
        'app.record.index.edit.show',
        'mobile.app.record.edit.show',
      ],
      submit: [
        'app.record.edit.submit',
        'app.record.index.edit.submit',
        'mobile.app.record.edit.submit',
      ],
      success: [
        'app.record.edit.submit.success',
        'app.record.index.edit.submit.success',
        'mobile.app.record.edit.submit.success',
      ]
    },
    all: {
      show: [
        'app.record.create.show',
        'mobile.app.record.create.show',
        'app.record.edit.show',
        'app.record.index.edit.show',
        'mobile.app.record.edit.show',
      ],
      submit: [
        'app.record.create.submit',
        'mobile.app.record.create.submit',
        'app.record.edit.submit',
        'app.record.index.edit.submit',
        'mobile.app.record.edit.submit',
      ],
      success: [
        'app.record.create.submit.success',
        'mobile.app.record.create.submit.success',
        'app.record.edit.submit.success',
        'app.record.index.edit.submit.success',
        'mobile.app.record.edit.submit.success',
      ]
    }
  }
}

export default config