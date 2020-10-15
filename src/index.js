import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.less'

const TOUCH_TIMEOUT = 100

class PickerColumn extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    itemHeight: PropTypes.number.isRequired,
    columnHeight: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    scrollTransitionDuration: PropTypes.number
  }

  constructor(props) {
    super(props)
    this.state = {
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      ...this.computeTranslate(props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isMoving) {
      return
    }
    this.setState(this.computeTranslate(nextProps))
  }

  computeTranslate = (props) => {
    const { options, value, itemHeight, columnHeight } = props
    let selectedIndex = options.indexOf(value)
    if (selectedIndex < 0) {
      // throw new ReferenceError()
      console.warn(`Warning: ${this.props.name} doesn't contain an option of ${value}.`)
      this.onValueSelected(options[0])
      selectedIndex = 0
    }
    return {
      scrollerTranslate: columnHeight / 2 - itemHeight / 2 - selectedIndex * itemHeight,
      minTranslate: columnHeight / 2 - itemHeight * options.length + itemHeight / 2,
      maxTranslate: columnHeight / 2 - itemHeight / 2
    }
  }

  onValueSelected = (newValue) => {
    this.props.onChange(this.props.name, newValue)
  }

  handleTouchStart = (event) => {
    if (this.isTouchedOffTimeout) {
      clearTimeout(this.isTouchedOffTimeout)
    } else {
      // added isTouched flag to prevent extra onClick event
      this.isTouchedOnTimeout = setTimeout(() => {
        this.isTouchedOnTimeout = null
        this.isTouched = true
      }, TOUCH_TIMEOUT)
    }

    const startTouchY = event.touches[0].clientY
    this.setState(({ scrollerTranslate }) => ({
      startTouchY,
      startScrollerTranslate: scrollerTranslate
    }))
  }

  handleTouchMove = (event) => {
    event.preventDefault()
    const touchY = event.touches[0].clientY
    this.setState(({ isMoving, startTouchY, startScrollerTranslate, minTranslate, maxTranslate }) => {
      if (!isMoving) {
        return {
          isMoving: true
        }
      }

      let nextScrollerTranslate = startScrollerTranslate + touchY - startTouchY
      if (nextScrollerTranslate < minTranslate) {
        nextScrollerTranslate = minTranslate - Math.pow(minTranslate - nextScrollerTranslate, 0.8)
      } else if (nextScrollerTranslate > maxTranslate) {
        nextScrollerTranslate = maxTranslate + Math.pow(nextScrollerTranslate - maxTranslate, 0.8)
      }
      return {
        scrollerTranslate: nextScrollerTranslate
      }
    })
  }

  handleTouchEnd = (event) => {
    if (this.isTouchedOnTimeout) {
      clearTimeout(this.isTouchedOnTimeout)
    } else {
      // added isTouched flag to prevent extra onClick event
      this.isTouchedOffTimeout = setTimeout(() => {
        this.isTouchedOffTimeout = null
        this.isTouched = false
      }, TOUCH_TIMEOUT)
    }

    if (!this.state.isMoving) {
      return
    }
    this.setState({
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0
    })
    setTimeout(() => {
      const { options, itemHeight } = this.props
      const { scrollerTranslate, minTranslate, maxTranslate } = this.state
      let activeIndex
      if (scrollerTranslate > maxTranslate) {
        activeIndex = 0
      } else if (scrollerTranslate < minTranslate) {
        activeIndex = options.length - 1
      } else {
        activeIndex = -Math.round((scrollerTranslate - maxTranslate) / itemHeight)
      }
      this.onValueSelected(options[activeIndex])
    }, this.props.scrollTransitionDuration || 0)
  }

  handleTouchCancel = (event) => {
    if (this.isTouchedOnTimeout) {
      clearTimeout(this.isTouchedOnTimeout)
    } else {
      // added isTouched flag to prevent extra onClick event
      this.isTouchedOffTimeout = setTimeout(() => {
        this.isTouchedOffTimeout = null
        this.isTouched = false
      }, TOUCH_TIMEOUT)
    }

    if (!this.state.isMoving) {
      return
    }
    this.setState(({ startScrollerTranslate }) => {
      return {
        isMoving: false,
        startTouchY: 0,
        startScrollerTranslate: 0,
        scrollerTranslate: startScrollerTranslate
      }
    })
  }

  handleItemClick = (option) => {
    if (this.isTouched) return

    if (option !== this.props.value) {
      this.onValueSelected(option)
    } else {
      this.props.onClick(this.props.name, this.props.value)
    }
  }

  renderItems() {
    const { options, itemHeight, value } = this.props
    return options.map((option, index) => {
      const style = {
        height: itemHeight + 'px',
        lineHeight: itemHeight + 'px'
      }
      const className = `picker-item${option === value ? ' picker-item-selected' : ''}`
      const onClick = () => this.handleItemClick(option)
      return (
        <div
          key={index}
          className={className}
          style={style}
          onClick={onClick}
        >
          {option}
        </div>
      )
    })
  }

  render() {
    const translateString = `translate3d(0, ${this.state.scrollerTranslate}px, 0)`
    const style = {
      MsTransform: translateString,
      MozTransform: translateString,
      OTransform: translateString,
      WebkitTransform: translateString,
      transform: translateString
    }
    if (this.state.isMoving) {
      style.transitionDuration = `${this.props.scrollTransitionDuration || 0}ms`
      style.transitionTimingFunction = 'ease'
    }

    return (
      <div className="picker-column">
        <div
          className="picker-scroller"
          style={style}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onTouchCancel={this.handleTouchCancel}>
          {this.renderItems()}
        </div>
      </div>
    )
  }
}

export default class Picker extends Component {
  static propTyps = {
    optionGroups: PropTypes.object.isRequired,
    valueGroups: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    itemHeight: PropTypes.number,
    height: PropTypes.number,
    scrollTransitionDuration: PropTypes.number
  }

  static defaultProps = {
    onClick: () => { },
    itemHeight: 36,
    height: 216
  }

  renderInner() {
    const { optionGroups, valueGroups, itemHeight, height, onChange, onClick, scrollTransitionDuration } = this.props
    const highlightStyle = {
      height: itemHeight,
      marginTop: -(itemHeight / 2)
    }
    const columnNodes = []
    for (let name in optionGroups) {
      columnNodes.push(
        <PickerColumn
          key={name}
          name={name}
          options={optionGroups[name]}
          value={valueGroups[name]}
          itemHeight={itemHeight}
          columnHeight={height}
          onChange={onChange}
          onClick={onClick}
          scrollTransitionDuration={scrollTransitionDuration}
        />
      )
    }
    return (
      <div className="picker-inner">
        {columnNodes}
        <div className="picker-highlight" style={highlightStyle} />
      </div>
    )
  }

  render() {
    const style = {
      height: this.props.height
    }

    return (
      <div className="picker-container" style={style}>
        {this.renderInner()}
      </div>
    )
  }
}
