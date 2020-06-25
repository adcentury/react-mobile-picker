import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.less';

const TIMEOUT_TIME = 100

class PickerColumn extends React.Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    itemHeight: PropTypes.number.isRequired,
    columnHeight: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  }

  isMoving = false

  isTouched = false

  maxTranslate = 0

  minTranslate = 0

  previousClientY = 0

  scrollerTranslate = 0

  startScrollerTranslate = 0

  startClientY = 0

  constructor(props) {
    super(props)
    this.computeTranslate(props)
  }

  componentDidUpdate() {
    if (this.isMoving) return
    this.computeTranslate(this.props)
  }

  computeTranslate = ({ options, value, itemHeight, columnHeight }) => {
    let selectedIndex = options.indexOf(value)

    if (selectedIndex < 0) {
      // throw new ReferenceError()
      console.warn('Warning: "' + this.props.name + '" doesn\'t contain an option of "' + value + '".')
      this.onValueSelected(options[0])
      selectedIndex = 0
    }

    const newScrollerTranslate = columnHeight / 2 - itemHeight / 2 - selectedIndex * itemHeight
    if (this.scrollerTranslate !== newScrollerTranslate) {
      this.scrollerTranslate = newScrollerTranslate
      this.forceUpdate()
    }
    this.minTranslate = columnHeight / 2 - itemHeight * options.length + itemHeight / 2
    this.maxTranslate = columnHeight / 2 - itemHeight / 2
  }

  onValueSelected = (newValue) => {
    this.props.onChange(this.props.name, newValue)
    setTimeout(this.forceUpdate.bind(this), TIMEOUT_TIME)
  }

  handleTouchStart = (event) => {
    this.startClientY = event.touches[0].clientY
    this.previousClientY = event.touches[0].clientY
    this.startScrollerTranslate = this.scrollerTranslate
  }

  handleTouchMove = (event) => {
    event.preventDefault()
    this.isTouched = true
    const touchY = event.touches[0].clientY

    if (!this.isMoving) this.isMoving = true

    this.previousClientY = event.touches[0].clientY
    let nextScrollerTranslate = this.startScrollerTranslate + touchY - this.startClientY
    if (nextScrollerTranslate < this.minTranslate) {
      nextScrollerTranslate = this.minTranslate - Math.pow(this.minTranslate - nextScrollerTranslate, 0.8)
    } else if (nextScrollerTranslate > this.maxTranslate) {
      nextScrollerTranslate = this.maxTranslate + Math.pow(nextScrollerTranslate - this.maxTranslate, 0.8)
    }
    this.scrollerTranslate = nextScrollerTranslate
    this.forceUpdate()
  }

  handleTouchEnd = () => {
    if (!this.isMoving) return

    this.isMoving = false
    this.previousClientY = 0
    this.startClientY = 0
    this.startScrollerTranslate = 0

    setTimeout(() => {
      this.isTouched = false
    }, TIMEOUT_TIME)

    setTimeout(() => {
      const { options, itemHeight } = this.props
      const { scrollerTranslate, minTranslate, maxTranslate } = this
      let activeIndex
      if (scrollerTranslate > maxTranslate) {
        activeIndex = 0
      } else if (scrollerTranslate < minTranslate) {
        activeIndex = options.length - 1
      } else {
        const delta = Math.abs(scrollerTranslate - maxTranslate) / itemHeight
        activeIndex = Math.round(delta)
      }
      this.onValueSelected(options[activeIndex])
    }, 0)
  }

  handleTouchCancel = () => {
    if (!this.isMoving) return

    this.isMoving = false
    this.startClientY = 0
    this.startScrollerTranslate = 0
    this.scrollerTranslate = this.startScrollerTranslate
    this.forceUpdate()
  }

  handleItemClick = (option) => {
    if (this.isTouched) return
    if (option !== this.props.value) {
      this.onValueSelected(option)
    } else {
      this.props.onClick(this.props.name, this.props.value)
      setTimeout(this.forceUpdate.bind(this), TIMEOUT_TIME)
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

      return (
        <div
          key={index}
          className={className}
          style={style}
          onClick={() => this.handleItemClick(option)}
        >
          {option}
        </div>
      )
    })
  }

  render() {
    const translateString = `translate3d(0, ${this.scrollerTranslate}px, 0)`
    const style = { transform: translateString }
    if (this.isMoving) style.transitionDuration = '0ms'

    return (
      <div className="picker-column">
        <div
          className="picker-scroller"
          style={style}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onTouchCancel={this.handleTouchCancel}
        >
          {this.renderItems()}
        </div>
      </div>
    )
  }
}

export default class Picker extends React.Component {
  static propTypes = {
    optionGroups: PropTypes.object.isRequired,
    valueGroups: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    itemHeight: PropTypes.number,
    height: PropTypes.number
  }

  static defaultProps = {
    onClick: () => {},
    itemHeight: 36,
    height: 216
  }

  renderInner() {
    const { optionGroups, valueGroups, itemHeight, height, onChange, onClick } = this.props
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
