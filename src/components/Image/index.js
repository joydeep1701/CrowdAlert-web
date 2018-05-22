import React from 'react'
import { Image, Modal, Responsive } from 'semantic-ui-react'

const ImageModal = (props) => (<Modal trigger={<Image src = {
    `data:image/png;base64,${props.image_base64}`
  }
  size = 'small' />}>
  <Modal.Header>Photo</Modal.Header>
  <Modal.Content image={true}>
    <Responsive maxWidth={900}>
      <Image fluid={true} src={`data:image/png;base64,${props.image_base64}`}/>
    </Responsive>
    <Responsive minWidth={900}>
      <Image size='massive' src={`data:image/png;base64,${props.image_base64}`}/>
    </Responsive>
  </Modal.Content>
</Modal>)

export default ImageModal;
