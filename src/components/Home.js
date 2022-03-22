import React, { useState, useEffect } from 'react'
import Swal from '../../node_modules/sweetalert2/dist/sweetalert2.js'
import { supabase } from './supabaseClient'
import Account from './Account.js'

const Home = ({ session }) => {

    const [account, setAccount] = useState(false);

  /* useEffect(() => {
    getProfile()
  }, [session])
 */
  /* const getProfile = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, weight, height, age`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setWeight(data.weight)
        setHeight(data.height)
        setAge(data.age)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        weight,
        height,
        age,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
    Swal.fire({
        title: 'Success!',
        text: 'Profile succesfully updated',
        icon: 'success',
        confirmButtonText: 'OK'
      })
  } */

  return (
      <section className='container section'>
          {account ? <Account key={session.user.id} session={session} /> : ""}
          <h1>Dashboard</h1>
          <button type="button" className="button mt-3 is-primary" onClick={() => setAccount(!account)}>
        Account
      </button>
          <button type="button" className="button mt-3 is-primary" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </section>
  )
}

export default Home