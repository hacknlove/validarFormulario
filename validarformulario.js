import { $ } from 'meteor/jquery'

var validarElemento = function (elemento, valor, validation) {
  validation = validation || ''
  var onfocus = elemento
  if (elemento.tagName === 'SPAN') {
    onfocus = elemento.children[0]
    valor = onfocus.value
  }

  if (elemento.tagName === 'LABEL') {
    onfocus = elemento.children[0]
    valor = onfocus.checked
  }

  if (validation.match(/\bvacio\b/) && !valor) {
    $(elemento).addClass('error vacio')
    $(onfocus).one('focus', function () {
      $(elemento).removeClass('error vacio')
    })
    return
  }

  if (validation.match(/\bemail\b/) && !valor.match(/^[a-z0-9A-Z._+-]+@[a-z0-9A-Z._+-]+\.[a-z0-9A-Z._+-]+$/)) {
    $(elemento).addClass('error noValido')
    $(onfocus).one('focus', function () {
      $(elemento).removeClass('error noValido')
    })
    return
  }
  if (validation.match(/\btelefono\b/) && !valor.match(/^[0-9 ()+-]{8,30}$/)) {
    $(elemento).addClass('error noValido')
    $(onfocus).one('focus', function () {
      $(elemento).removeClass('error noValido')
    })
    return
  }

  return true
}

export const validarFormulario = function (form) {
  var data = []
  if (form[1]) {
    form.each(function () {
      data.push(validarFormulario($(this)))
    })
    return data
  }
  data = {}
  form.find('input, textarea, span.password, label.checkbox').each(function () {
    var valor
    if (this.name) {
      valor = this.value
      if (this.type === 'checkbox' || this.type === 'radio') {
        valor = this.checked
      }
    }
    if (!validarElemento(this, valor, this.dataset.validacion)) {
      data.error = true
    }
    if (valor === false && this.value !== valor) {
      return
    }
    if (data[this.name] === undefined) {
      data[this.name] = this.value
      return
    }
    if (Array.isArray(data[this.name])) {
      data[this.name].push(this.value)
      return
    }
    data[this.name] = [data[this.name], this.value]
  })
  return data
}

$.fn.validarFormulario = function () {
  const data = validarFormulario(this)
  $(this).scrollAError()
  return data
}

$.fn.marcarError = function (error, texto) {
  const element = this
  var onfocus = this
  if (!this.is('input, textarea')) {
    onfocus = $(this).find('input, textarea')
  }
  if (texto) {
    $(element).next('.errores').find(`.${error}`).text(texto)
  }
  $(element).addClass('error').addClass(error)

  $(onfocus).one('focus', function () {
    $(element).removeClass('error').removeClass(error)
  })
  element.closest('form').scrollAError()
}

$.fn.scrollAError = function () {
  const element = this
  const offset = Math.min.apply(null,
    $(element).find('.error')
      .map(function () { return $(this).offset().top })
  ) - 100

  $([document.documentElement, document.body]).animate({
    scrollTop: offset
  }, 2000)
}
