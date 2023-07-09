import React, {
    ChangeEvent,
    InputHTMLAttributes,
    DetailedHTMLProps,
    HTMLAttributes,
} from 'react'
import s from './SuperRadio.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<
    HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
>
type ArrType = {
    id: number
    value: string
}

type SuperRadioPropsType = Omit<DefaultRadioPropsType, 'type'> & {
    options?: ArrType[]
    onChangeOption?: (option: number) => void
    spanProps?: DefaultSpanPropsType // пропсы для спана
}

const SuperRadio: React.FC<SuperRadioPropsType> = ({
    id,
    name,
    className,
    options,
    value,
    onChange,
    onChangeOption,
    spanProps,
    ...restProps
}) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        // делают студенты
        // if (onChangeOption) {
        //     onChangeOption(e.currentTarget.value)
        // }
        {
            onChange && onChange(e)
            onChangeOption && onChangeOption(+e.currentTarget.value)
            // + приводит строку к число, так как input value - это строка или можно так
            // onChangeOption && onChangeOption(Number(e.currentTarget.value))
            // или так:
            // onChangeOption && onChangeOption(JSON.parse(e.currentTarget.value))
        }
    }

    const finalRadioClassName = s.radio + (className ? ' ' + className : '')
    const spanClassName = s.span + (spanProps?.className ? ' ' + spanProps.className : '')

    // React.ReactElement[] - так как есть jsx то типизация такая

    const mappedOptions: React.ReactElement[] = options
        ? options.map((o) => (
              <label key={name + '-' + o.id} className={s.label}>
                  <input
                      id={id + '-input-' + o.id}
                      className={finalRadioClassName}
                      type={'radio'}
                      name={name}
                      checked={o.id === value}
                      value={o.id}
                      onChange={onChangeCallback}
                      {...restProps}
                  />
                  <span
                      id={id + '-span-' + o.id}
                      {...spanProps}
                      className={spanClassName}
                  >
                      {o.value}
                  </span>
              </label>
          ))
        : []

    return <div className={s.options}>{mappedOptions}</div>
}

export default SuperRadio
