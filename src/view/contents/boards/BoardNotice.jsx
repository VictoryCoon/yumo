import React, {Component, useState} from 'react'
import * as THREE from 'three'
import Stats from '../../../stats'
//import {FPSStats} from 'react-stats'
import {Canvas,useFrame} from '@react-three/fiber'
//import {OrbitControls} from '@react-three/drei'
import axios from 'axios'
import { render } from '@testing-library/react'
var step = 0;
const BoardNotice = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const onChangeUserId = ({ target : { value } }) => setUserId(value);
  const onChangeUserPw = ({ target : { value } }) => setUserPw(value);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/insertUserInfo',
    '{"userId":+"'+userId+'"+,"userNick":"노인"}'
    )
    .then(function (response) {
        if(response.data.code != "1000"){   // Fail
          alert(response.data.code + " - " + response.data.desc)
          return;
        }else{                              //Success
          console.log("??? : "+response.data);
          alert(response.data);
        }
    })
    .catch(function (error) {
        console.log("ERR : "+error.data)
    })
  };
  const initStat = () => {
    var stats = Stats()
    stats.setMode(0)
    stats.domElement.style.position = 'absoulute'
    stats.domElement.style.left = '0px'
    stats.domElement.style.top = '0px'
    document.getElementById("statsOut").appendChild(stats.domElement)
    return stats
  }
  const init1 = ()=> {
    //var stats = initStat()
    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
    var renderer = new THREE.WebGLRenderer()
    var axes = new THREE.AxisHelper(20)
    var planeGeometry = new THREE.PlaneGeometry(60,20,1,1)
    var planeMaterial = new THREE.MeshBasicMaterial({color:0xcccccc})
    var plane = new THREE.Mesh(planeGeometry, planeMaterial)
    var cubeGeometry = new THREE.BoxGeometry(4,4,4)
    var cubeMaterial = new THREE.MeshBasicMaterial({color:0xff00000,wireframe:true}) // Red
    var cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
    var sphereGeometry = new THREE.SphereGeometry(4,20,20)
    var sphereMaterial = new THREE.MeshBasicMaterial({color:0x7777ff,wireframe:true})
    var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)

    renderer.setClearColor(0xEEEEEE) // #EEEEEE 같네
    renderer.setSize(window.innerWidth, window.innerHeight)

    scene.add(axes)

    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0

    scene.add(plane)

    cube.position.x = -4
    cube.position.y = 3
    cube.position.z = 0

    scene.add(cube)
    
    sphere.position.x = 20
    sphere.position.y = 4
    sphere.position.z = 2

    scene.add(sphere)

    camera.position.x = -30
    camera.position.y = 20
    camera.position.z = 10
    camera.lookAt(scene.position)
    document.getElementById("gl").appendChild(renderer.domElement)
    renderer.render(scene,camera)
  }
  const init2 = ()=> {
    var stats = initStat()
    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
    var renderer = new THREE.WebGLRenderer()
    var axes = new THREE.AxisHelper(20)

    var planeGeometry = new THREE.PlaneGeometry(60,20,1,1)
    var planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff})
    var plane = new THREE.Mesh(planeGeometry, planeMaterial)

    var cubeGeometry = new THREE.BoxGeometry(4,4,4)
    var cubeMaterial = new THREE.MeshLambertMaterial({color:0xff0000}) // Red
    var cube = new THREE.Mesh(cubeGeometry,cubeMaterial)

    var sphereGeometry = new THREE.SphereGeometry(4,20,20)
    var sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff})
    var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)

    var spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(-40,60,-10)
    spotLight.castShadow = true

    scene.add(spotLight)

    renderer.setClearColor(0xEEEEEE) // #EEEEEE 같네
    //renderer.setClearColor(new THREE.Color(0xEEEEEE,1.0))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMapEnabled = true
    
    scene.add(axes)

    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0

    plane.receiveShadow = true

    scene.add(plane)

    cube.position.x = -4
    cube.position.y = 3
    cube.position.z = 0

    cube.castShadow = true

    scene.add(cube)
    
    sphere.position.x = 20
    sphere.position.y = 4
    sphere.position.z = 2

    sphere.castShadow = true

    scene.add(sphere)

    camera.position.x = -30
    camera.position.y = 40
    camera.position.z = 30
    camera.lookAt(scene.position)

    document.getElementById("gl").appendChild(renderer.domElement)
    const renderScene = () => {
      stats.update()
      
      cube.rotation.x += 0.02
      cube.rotation.y += 0.02
      cube.rotation.z += 0.02

      step += 0.04
      sphere.position.x = 20 + (10 * (Math.cos(step)))
      sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)))

      requestAnimationFrame(renderScene)
      renderer.render(scene,camera)
    }
    renderScene()
  }
  init2()
    return (
      /*
      <div className="BodyContent">
        <form onSubmit={handleSubmit}>
          <input type="userId" name="userId" value={userId} onChange={onChangeUserId}/><br/>
          <input type="userPw" name="userPw" value={userPw} onChange={onChangeUserPw}/><br/>
          <button type="submit">Log - In</button>
        </form>  
      </div>
      */
      <div className="BodyContent">
        <h1>Three Js Practice Spot</h1>
        <div id="statsOut"></div>
        <div id="gl">
        </div>
      </div>
    )
}

export default BoardNotice;