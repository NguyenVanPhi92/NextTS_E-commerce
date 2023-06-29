import { avatar } from '@/assets'
import { Spinner } from '@/components'
import { AccountContainer } from '@/container'
import { inputs } from '@/container/account/data'
import { userInfoSchema } from '@/core/schema'
import { isObjectHasValue } from '@/helper'
import { MainAuthLayout } from '@/layout'
import { API_URL } from '@/services'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useAttachment, useUser } from 'shared/hook'
import { InputField } from '../../shared/components/form/field/inputField'
import { RadioField } from '../../shared/components/form/field/radioField'
import { dataGender } from '../../shared/helper/data'

interface UserForm {
  phone: string
  email: string
  name: string
  sex?: 'male' | 'female' | ''
}

const UserInfo = () => {
  const { data: userInfo, updateUser, isValidating } = useUser()
  const { getBase64Images } = useAttachment({ limit: 1 })

  // useForm
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm({
    resolver: yupResolver(userInfoSchema),
    mode: 'all'
  })

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files) return

    getBase64Images(e.target.files, (images) => {
      if (!images?.[0]) return
      updateUser({
        name_customs: userInfo.name,
        sex: userInfo.sex || '',
        email: userInfo.email,
        image: images?.[0].replace(/^data:image\/\w+;base64,/, '')
      })
    })
  }

  const handleEditUser = (user: UserForm) => {
    updateUser({
      email: user?.email || '',
      name_customs: user?.name || '',
      sex: user?.sex || ''
    })
  }

  return (
    <AccountContainer
      headerMobileTitle='Thông tin'
      breadcrumbList={[
        { path: '/account', name: 'Tài khoản' },
        { path: '/', name: 'Hồ sơ' }
      ]}
      heading='Thông tin người dùng'
    >
      <div className='user__info-container'>
        {isValidating ? (
          <div className='flex-center w-full'>
            <Spinner />
          </div>
        ) : (
          <>
            {/* Form New */}
            <div className='user__info-form'>
              {isObjectHasValue(userInfo) && (
                <form className='form-control' onSubmit={handleSubmit(handleEditUser)}>
                  <div key={inputs[0].id} className='form-item-inline' style={{ margin: 0 }}>
                    <label htmlFor={inputs[0].id}>{inputs[0].vniTitle}</label>
                    <div className='form-item-inline-wrapper'>
                      <InputField
                        control={control}
                        id={inputs[0].id}
                        placeholder={inputs[0].vniTitle}
                        name={inputs[0].id}
                        defaultValue={userInfo.name}
                      />
                    </div>
                  </div>
                  <div key={inputs[1].id} className='form-item-inline' style={{ margin: 0 }}>
                    <label htmlFor={inputs[1].id}>{inputs[1].vniTitle}</label>
                    <div className='form-item-inline-wrapper'>
                      <InputField
                        control={control}
                        id={inputs[1].id}
                        placeholder={inputs[1].vniTitle}
                        name={inputs[1].id}
                        defaultValue={userInfo.email}
                      />
                    </div>
                  </div>
                  <div key={inputs[2].id} className='form-item-inline' style={{ margin: 0 }}>
                    <label htmlFor={inputs[2].id}>{inputs[2].vniTitle}</label>
                    <div className='form-item-inline-wrapper'>
                      <InputField
                        control={control}
                        id={inputs[2].id}
                        readOnly={userInfo.phone && inputs[2].id === 'phone'}
                        placeholder={inputs[2].vniTitle}
                        name={inputs[2].id}
                        defaultValue={userInfo.phone}
                      />
                    </div>
                  </div>
                  <div key={inputs[3].id} className='form-item-inline-radio'>
                    <div className='form-item-inline-wrapper flex'>
                      <label htmlFor={inputs[2].id}>Giới tính</label>
                      <div className='form-item-radio'>
                        <div className='flex'>
                          <RadioField
                            data={dataGender}
                            control={control}
                            defaultValue={userInfo?.sex}
                            name='sex'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type='submit' className='btn-primary'>
                    Cập nhật
                  </button>
                </form>
              )}
            </div>

            <div className='user__info-avatar'>
              <div className='user__info-avatar-wrapper'>
                <input
                  onChange={handleChangeAvatar}
                  type='file'
                  name=''
                  hidden
                  id='user-info-avatar'
                />
                <label htmlFor='user-info-avatar'>
                  <div className='image-container'>
                    <Image
                      src={userInfo?.avatar ? `${API_URL}${userInfo.avatar}` : avatar}
                      quality={10}
                      layout='fill'
                      className='image'
                      alt=''
                    />
                  </div>
                </label>

                <label
                  htmlFor='user-info-avatar'
                  className='btn-primary-outline user__info-avatar-btn'
                >
                  Chọn ảnh
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    </AccountContainer>
  )
}

UserInfo.Layout = MainAuthLayout

export default UserInfo
