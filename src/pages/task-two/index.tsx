/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  Upload,
  message,
} from 'antd'
import { FaPlus } from 'react-icons/fa'
import { MaskedInput } from 'antd-mask-input'
import dayjs from 'dayjs'

const { TextArea } = Input

interface IFormValues {
  name: string
  gender: 'man' | 'woman'
  birthday: string
  phone: string
  fruits: 'apple' | 'pear'
  city: 'uzbekistan' | 'kazakhstan'
  number: number
  about: string
  check: boolean
  image: FileList
  height: number
  color: string
  phoneAgree: boolean
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

const TaskTwo: React.FC = () => {
  const [form] = Form.useForm()
  const [selectedFruit, setSelectedFruit] = useState('')
  const [isAbout, setIsAbout] = useState(false)
  const [checked, setChecked] = useState(false)
  const [phone, setPhone] = useState('')
  const onFinish = (values: IFormValues) => {
    console.log('Received values of form: ', values)
    message.success('Успешно отправлено')
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    message.error('Произошла ошибка, повторите попытку')
  }

  return (
    <>
      <h1 className='text-center text-3xl font-semibold mb-10'>Профиль</h1>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Ф.И.О'
          name='name'
          rules={[{ required: true, message: 'Пожалуйста, введите Ф.И.О.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Пол'
          name='gender'
          rules={[{ required: true, message: 'Пожалуйста, выберите пол.' }]}
        >
          <Select>
            <Select.Option value='man'>Мужской</Select.Option>
            <Select.Option value='woman'>Женский</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label='День рождения'
          name='birthday'
          rules={[
            { required: true, message: 'Пожалуйста, введите день рождения.' },
          ]}
        >
          <DatePicker maxDate={dayjs()} />
        </Form.Item>
        <Form.Item
          label='Телефон'
          name='phone'
          rules={[{ required: true, message: 'Пожалуйста, введите телефон.' }]}
        >
          <MaskedInput
            onChange={e => setPhone(e.unmaskedValue)}
            mask={'+{998}00 000 00 00'}
          />
        </Form.Item>
        {phone.length === 12 && (
          <Form.Item label='Второй телефон' name='second_phone'>
            <MaskedInput mask={'+{998}00 000 00 00'} />
          </Form.Item>
        )}
        <Form.Item
          label='Что вы любите'
          name='fruits'
          rules={[{ required: true, message: 'Пожалуйста, выберите фрукт.' }]}
        >
          <Radio.Group onChange={e => setSelectedFruit(e.target.value)}>
            <Radio value='apple'> Яблоко </Radio>
            <Radio value='pear'> Груша </Radio>
          </Radio.Group>
        </Form.Item>
        {selectedFruit === 'apple' && (
          <Form.Item
            label='Какое яблоко нравится?'
            name='type_apple'
            rules={[
              { required: true, message: 'Пожалуйста, выберите вид яблока.' },
            ]}
          >
            <Radio.Group>
              <Radio value='apple'>Кислый</Radio>
              <Radio value='pear'>Обычный</Radio>
            </Radio.Group>
          </Form.Item>
        )}
        <Form.Item
          label='Город'
          name='city'
          rules={[{ required: true, message: 'Пожалуйста, выберите город.' }]}
        >
          <Cascader
            options={[
              {
                value: 'uzbekistan',
                label: 'Узбекистан',
                children: [
                  {
                    value: 'tashkent',
                    label: 'Ташкент',
                  },
                  {
                    value: 'samarkand',
                    label: 'Самарканд',
                  },
                  {
                    value: 'nukus',
                    label: 'Нукус',
                  },
                ],
              },
              {
                value: 'kazakhstan',
                label: 'Казахстан',
                children: [
                  {
                    value: 'astana',
                    label: 'Астана',
                  },
                  {
                    value: 'pavlodar',
                    label: 'Павлодар',
                  },
                  {
                    value: 'almaty',
                    label: 'Алматы',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label='Любимое число'
          name='number'
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите любимое число.',
            },
          ]}
        >
          <InputNumber type='number' />
        </Form.Item>
        <Form.Item
          label='Хотите рассказать о себе?'
          valuePropName='checked'
          name='check'
          rules={[{ required: true, message: 'Пожалуйста, включите меня :).' }]}
        >
          <Switch onChange={e => setIsAbout(e)} />
        </Form.Item>
        <Form.Item
          label='О себе'
          name='about'
          rules={[
            {
              min: 20,
              max: 1000,
              message: 'Количество букв должно быть в пределах 20-1000.',
            },
          ]}
        >
          <TextArea disabled={!isAbout} rows={4} />
        </Form.Item>
        <Form.Item
          label='Изображение'
          valuePropName='fileList'
          name='image'
          getValueFromEvent={normFile}
        >
          <Upload listType='picture-card'>
            <button
              style={{
                border: 0,
                background: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              type='button'
            >
              <FaPlus />
              <div style={{ marginTop: 8 }}>Загрузить</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item
          label='Любимый цвет'
          name='color'
          rules={[
            { required: true, message: 'Пожалуйста, выберите любимый цвет.' },
          ]}
        >
          <ColorPicker />
        </Form.Item>
        <Form.Item
          label='Условия пользования'
          valuePropName='checked'
          name='terms'
          rules={[
            { required: true, message: 'Пожалуйста, согласитесь с условиями.' },
          ]}
        >
          <Checkbox
            value={checked}
            onChange={e => setChecked(e.target.checked)}
          >
            Согласен с условиями пользования
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' type='primary'>
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export { TaskTwo }
